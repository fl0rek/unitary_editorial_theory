---
tags: node
---

```template
{{{page where tags = "service" select service-name, url, port}}}
```

## Services
### nixos
- **ssh** ssh:duskwood
- **cockpit** http://duskwood:9010
- **nginx**
  ports: 888
- **dashy**
- **silverbullet** http://duskwood:888

### docker
- **traefik**
  ports: 80 8001 (dashboard)
- **whoami** http://duskwood/whoami
- **jellyfin** http://duskwood:8096
  ports: 8096 8920 7359/udp 1900/udp
- **qbittorrent** http://duskwood:8080
  ports (via gluetun): 8080
- **nzbget** http://duskwood:6789
  ports (via gluetun): 6789
- **gluetun**
  ports: 8388/* 8000 54816/*
- **sonarr** http://duskwood/sonarr
  ports: 8989
- **radarr** http://duskwood/radarr
- **ombi** http://duskwood/ombi (pass: ???)
- **authentik_ldap** https://auth.florkiewicz.me
  ports: 389 636
- **readarr** http://duskwood/readarr
  ports: 8787
- **flaresolverr**
  ports: 8191
- **prowlarr** http://duskwood/prowlarr  
- **homepage** http://duskwood
- **homarr** http://duskwood/homarr
  ports: 8889
- **dillinger**
- **grocy**
- **whisparr**
- **watchtower**

## Mounts
### /
- wd blue ssd
### /srv/abercrombie
- red4
- hgst1

### dunno
- iron1
- blue4
### misc
- red0
