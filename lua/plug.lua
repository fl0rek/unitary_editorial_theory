return require('packer').startup(function()
	-- package manager
	use 'wbthomason/packer.nvim'

	-- mason to install other stuff
	use 'williamboman/mason.nvim'
	use 'williamboman/mason-lspconfig.nvim'

	-- rust-analyzer stuff
	use 'neovim/nvim-lspconfig'
	use 'simrat39/rust-tools.nvim'

	-- Completion framework:
	use 'hrsh7th/nvim-cmp'
	-- LSP completion source:
	use 'hrsh7th/cmp-nvim-lsp'
	-- Useful completion sources:
	use 'hrsh7th/cmp-nvim-lua'
	use 'hrsh7th/cmp-nvim-lsp-signature-help'
	use 'hrsh7th/cmp-vsnip'
	use 'hrsh7th/cmp-path'
	use 'hrsh7th/cmp-buffer'
	use 'hrsh7th/vim-vsnip'

	-- Tree sitter
	use 'nvim-treesitter/nvim-treesitter'

	-- Debugger
	use 'puremourning/vimspector'

	-- floating terminal
	use 'voldikss/vim-floaterm'

	use {
		'smoka7/hop.nvim',
		tag = '*', -- optional but strongly recommended
		config = function()
			-- you can configure Hop the way you like here; see :h hop-config
			require'hop'.setup { keys = 'etovxqpdygfblzhckisuran' }
		end
	}

	-- file picker
	use 'BurntSushi/ripgrep'
	use 'sharkdp/fd'
	use 'nvim-tree/nvim-web-devicons'
	use {
		'nvim-telescope/telescope.nvim', tag = '0.1.6',
		requires = { {'nvim-lua/plenary.nvim'} }
	}

	-- show various stuff
	use {
		"folke/todo-comments.nvim",
		dependencies = { "nvim-lua/plenary.nvim" }
	}
	use 'folke/trouble.nvim'

	-- show indentation
	use "lukas-reineke/indent-blankline.nvim"

	-- smart bracket matching
	use {
		"windwp/nvim-autopairs",
		event = "InsertEnter",
		config = function()
			require("nvim-autopairs").setup {}
		end
	}

	-- Highlight arguments' definitions and usages, asynchronously, using Treesitter
	use { 'm-demare/hlargs.nvim' }

	-- theme 
	use 'tanvirtin/monokai.nvim'

	-- display command as it's typed
	use {
		"folke/which-key.nvim",
		config = function()
			vim.o.timeout = true
			vim.o.timeoutlen = 300
			require("which-key").setup { }
		end
	}

	use 'nvim-focus/focus.nvim'
end)


