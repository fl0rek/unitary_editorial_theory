use clap::{Parser, ValueEnum};
use sha2::{Digest, Sha256};
use std::path::PathBuf;
use std::fs::File;
use std::io::{self, Write};

#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
struct EncoderArgs {
    #[arg(value_enum)]
    operation: Operation,

    path: PathBuf,
    path2: PathBuf
}

#[derive(ValueEnum,Clone, Debug)]
enum Operation {
    Encode,
    EncodeCelestia,
    Decode,
}

fn main() {
    let args = EncoderArgs::parse();
    match args.operation {
        Operation::Encode => encode(args.path, args.path2),
        Operation::EncodeCelestia => encode_celestia(args.path, args.path2),
        Operation::Decode => decode()
    }
}

fn encode(input: PathBuf, output: PathBuf) {
    let mut hasher = Sha256::new();
    let mut file = File::open(&input).expect("open file");
    io::copy(&mut file, &mut hasher).expect("hashing");
    let hash = hasher.finalize();

    let version : [u8; 32] = [0; 32];
    let prefix : [u8; 2]= [b'Q', b'm'];

    let hash : [u8; 32] = hash.into();

    let mut file = File::open(input).expect("open file");
    let mut output = File::create(output).expect("open file");
    output.write_all(&version).expect("w version");
    output.write_all(&prefix).expect("w prefix");
    output.write_all(&hash).expect("w hash");
    io::copy(&mut file, &mut output).expect("hashing");

}

fn encode_celestia(input: PathBuf, output: PathBuf) {
    let mut hasher = Sha256::new();
    let mut file = File::open(&input).expect("open file");
    io::copy(&mut file, &mut hasher).expect("hashing");
    let hash = hasher.finalize();

    let version : [u8; 32] = [0; 32];
    let prefix : [u8; 2]= [b'Q', b'm'];

    let hash : [u8; 32] = hash.into();

    let mut output = File::create(output).expect("open file");
    write!(output, "{{\"Blobs\":[{{\"namespace\":\"0x7468656f7279756e6465\",\"blobData\":\"0x").expect("json");
    write!(output, "{}", hex::encode(version)).expect("w version");
    write!(output, "{}", hex::encode(prefix)).expect("w prefix");
    write!(output, "{}", hex::encode(hash)).expect("w hash");
    let data:Vec<u8> = std::fs::read(input).expect("o data");
    write!(output, "{}", hex::encode(data)).expect("w data");

    write!(output, "\"}}]}}").expect("json");

}

fn decode() {

}
