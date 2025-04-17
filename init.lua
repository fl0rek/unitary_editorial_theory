-- LEADER
vim.g.mapleader = " " -- works across all nvim files

vim.loader.enable()

-- let g:neovide_scale_factor = 0.75

require("plug")
require("opts")
require("keys")

-- Mason Setup
require("mason").setup({
	ui = {
		icons = {
			package_installed = "",
			package_pending = "",
			package_uninstalled = "",
		},
	}
})
require("mason-lspconfig").setup_handlers {
  ['rust_analyzer'] = function() end,
}
require("mason-lspconfig").setup()

--[[
local rt = require("rust-tools")
rt.setup({
	server = {
		on_attach = function(_, bufnr)
			-- Hover actions
			vim.keymap.set("n", "<C-space>", rt.hover_actions.hover_actions, { buffer = bufnr })
			-- Code action groups
			vim.keymap.set("n", "<Leader>a", rt.code_action_group.code_action_group, { buffer = bufnr })
		end,
	},
})
]]

ide = false
if ide then
	-- IDE setup
	local bufferlist      = require('ide.components.bufferlist')
	local explorer        = require('ide.components.explorer')
	local outline         = require('ide.components.outline')
	local callhierarchy   = require('ide.components.callhierarchy')
	local timeline        = require('ide.components.timeline')
	local terminal        = require('ide.components.terminal')
	local terminalbrowser = require('ide.components.terminal.terminalbrowser')
	local changes         = require('ide.components.changes')
	local commits         = require('ide.components.commits')
	local branches        = require('ide.components.branches')
	local bookmarks       = require('ide.components.bookmarks')
	require('ide').setup({})
end

-- LSP Diagnostics Options Setup 
local sign = function(opts)
	vim.fn.sign_define(opts.name, {
		texthl = opts.name,
		text = opts.text,
		numhl = ''
	})
end

sign({name = 'DiagnosticSignError', text = ''})
sign({name = 'DiagnosticSignWarn', text = ''})
sign({name = 'DiagnosticSignHint', text = ''})
sign({name = 'DiagnosticSignInfo', text = ''})

vim.diagnostic.config({
	virtual_text = false,
	signs = true,
	update_in_insert = true,
	underline = true,
	severity_sort = false,
	float = {
		border = 'rounded',
		source = 'always',
		header = '',
		prefix = '',
	},
})

vim.g.rustaceanvim = {
  -- Plugin configuration
  tools = {},
  -- LSP configuration
  server = {
    on_attach = function(client, bufnr)
      -- you can also put keymaps in here
    end,
    default_settings = {
      -- rust-analyzer language server configuration
      ['rust-analyzer'] = {
        cargo = {
          target = "wasm32-unknown-unknown"
        }
      },
    },
  },
  -- DAP configuration
  dap = {},
}

--[[
local lspconfig = require('lspconfig')
lspconfig.rust_analyzer.setup {
  -- Server-specific settings. See `:help lspconfig-setup`
  settings = {
    ['rust-analyzer'] = {
      cargo = {
        target = "wasm32-unknown-unknown"
      }
    },
  },
}
]]

vim.cmd([[
set signcolumn=yes
autocmd CursorHold * lua vim.diagnostic.open_float(nil, { focusable = false })
]])

-- Completion Plugin Setup
local cmp = require'cmp'
cmp.setup({
	-- Enable LSP snippets
	snippet = {
		expand = function(args)
			vim.fn["vsnip#anonymous"](args.body)
		end,
	},
	mapping = {
		['<C-p>'] = cmp.mapping.select_prev_item(),
		['<C-n>'] = cmp.mapping.select_next_item(),
		-- Add tab support
		['<S-Tab>'] = cmp.mapping.select_prev_item(),
		['<Tab>'] = cmp.mapping.select_next_item(),
		['<C-S-f>'] = cmp.mapping.scroll_docs(-4),
		['<C-f>'] = cmp.mapping.scroll_docs(4),
		['<C-Space>'] = cmp.mapping.complete(),
		['<C-e>'] = cmp.mapping.close(),
		['<CR>'] = cmp.mapping.confirm({
			behavior = cmp.ConfirmBehavior.Insert,
			select = true,
		})
	},
	-- Installed sources:
	sources = {
		{ name = 'path' },                              -- file paths
		{ name = 'nvim_lsp', keyword_length = 3 },      -- from language server
		{ name = 'nvim_lsp_signature_help'},            -- display function signatures with current parameter emphasized
		{ name = 'nvim_lua', keyword_length = 2},       -- complete neovim's Lua runtime API such vim.lsp.*
		{ name = 'buffer', keyword_length = 2 },        -- source current buffer
		{ name = 'vsnip', keyword_length = 2 },         -- nvim-cmp source for vim-vsnip 
		{ name = 'calc'},                               -- source for math calculation
	},
	window = {
		completion = cmp.config.window.bordered(),
		documentation = cmp.config.window.bordered(),
	},
	formatting = {
		fields = {'menu', 'abbr', 'kind'},
		format = function(entry, item)
			local menu_icon ={
				nvim_lsp = 'λ',
				vsnip = '⋗',
				buffer = 'Ω',
				path = '🖫',
			}
			item.menu = menu_icon[entry.source.name]
			return item
		end,
	},
})

-- Treesitter Plugin Setup 
require('nvim-treesitter.configs').setup {
	ensure_installed = { "lua", "rust", "toml" },
	auto_install = true,
	highlight = {
		enable = true,
		additional_vim_regex_highlighting=false,
	},
	ident = { enable = true }, 
	rainbow = {
		enable = true,
		extended_mode = true,
		max_file_lines = nil,
	}
}

-- Indent Blankline
require("ibl").setup()

-- Highlight arguments' definitions and usages, asynchronously, using Treesitter
require('hlargs').setup()

-- theme
require('monokai').setup {}

-- quickfix for comments
require('todo-comments').setup()
-- quickfix for compilation issues
require('trouble').setup()

-- auto resize splits
--require("focus").setup({ autoresize = { height_quickfix = 10 }})

-- GitHub integration
require('litee.lib').setup()
require('litee.gh').setup({})

-- lsp at glance
require('glance').setup()

-- cargo
require('crates').setup()

-- git integration
require('gitsigns').setup()


-- nix shit
require('lspconfig').nixd.setup{}

-- AI
require('llama-copilot').setup({
	host = "10.0.0.50",
	port = "11111",
	model = "codellama:7b-code",
	max_completion_size = -1,
	debug = false
})

-- progress status window
require('fidget').setup({})

-- auto set indentation options
require('guess-indent').setup{}
