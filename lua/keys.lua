function map(mode, lhs, rhs, opts)
    local options = { noremap = true }
    if opts then
        options = vim.tbl_extend("force", options, opts)
    end
    vim.api.nvim_set_keymap(mode, lhs, rhs, options)
end

-- system clipboard
vim.cmd([[
" " Copy to clipboard
vnoremap  <leader>y  "+y
nnoremap  <leader>Y  "+yg_
nnoremap  <leader>y  "+y
nnoremap  <leader>yy  "+yy
" " Paste from clipboard
nnoremap <leader>p "+p
nnoremap <leader>P "+P
vnoremap <leader>p "+p
vnoremap <leader>P "+P
]])

-- Window navigation
map("n", "<C-j>", "<C-w>j")
map("n", "<C-h>", "<C-w>h")
map("n", "<C-k>", "<C-w>k")
map("n", "<C-l>", "<C-w>l")

-- Vimspector
vim.cmd([[
nmap <F9> <cmd>call vimspector#Launch()<cr>
nmap <F5> <cmd>call vimspector#StepOver()<cr>
nmap <F8> <cmd>call vimspector#Reset()<cr>
nmap <F11> <cmd>call vimspector#StepOver()<cr>")
nmap <F12> <cmd>call vimspector#StepOut()<cr>")
nmap <F10> <cmd>call vimspector#StepInto()<cr>")
]])

map('n', "Db", ":call vimspector#ToggleBreakpoint()<cr>")
map('n', "Dw", ":call vimspector#AddWatch()<cr>")
map('n', "De", ":call vimspector#Evaluate()<cr>")


-- FloaTerm configuration
map('n', "<leader>ft", ":FloatermNew --name=myfloat --height=0.8 --width=0.7 --autoclose=2 fish <CR> ")
map('n', "t", ":FloatermToggle myfloat<CR>")
map('t', "<Esc>", "<C-\\><C-n>:q<CR>")

-- Telescope - F
local builtin = require('telescope.builtin')
vim.keymap.set('n', '<leader>ff', builtin.find_files, {})
vim.keymap.set('n', '<leader>fg', builtin.live_grep, {})
vim.keymap.set('n', '<leader>fb', builtin.buffers, {})
vim.keymap.set('n', '<leader>fh', builtin.help_tags, {})

vim.keymap.set('n', '<C-Space>', builtin.find_files, {})

-- Lua - X
vim.keymap.set("n", "<leader>xx", function() require("trouble").toggle() end)
vim.keymap.set("n", "<leader>xw", function() require("trouble").toggle("workspace_diagnostics") end)
vim.keymap.set("n", "<leader>xd", function() require("trouble").toggle("document_diagnostics") end)
vim.keymap.set("n", "<leader>xq", function() require("trouble").toggle("quickfix") end)
vim.keymap.set("n", "<leader>xl", function() require("trouble").toggle("loclist") end)
vim.keymap.set("n", "gR", function() require("trouble").toggle("lsp_references") end)

-- Todo List
map("n", "<leader>qf", ":TodoQuickFix<cr>")

-- Trouble
map("n", "<leader>e", ":TroubleToggle<cr>")

-- Nvim Tree
map("n", "<leader>nt", ":NvimTreeToggle<CR>")

-- Transparency
map("n", "<leader>\\", ":TransparentToggle<CR>")

-- Toggle colored column at 81
map('n', '<leader>|', ':execute "set colorcolumn=" . (&colorcolumn == "" ? "81" : "")<CR>')

-- GitHub integration keybindings
local wk = require("which-key")
wk.register({
    g = {
        name = "+Git",
        h = {
            name = "+Github",
            c = {
                name = "+Commits",
                c = { "<cmd>GHCloseCommit<cr>", "Close" },
                e = { "<cmd>GHExpandCommit<cr>", "Expand" },
                o = { "<cmd>GHOpenToCommit<cr>", "Open To" },
                p = { "<cmd>GHPopOutCommit<cr>", "Pop Out" },
                z = { "<cmd>GHCollapseCommit<cr>", "Collapse" },
            },
            i = {
                name = "+Issues",
                p = { "<cmd>GHPreviewIssue<cr>", "Preview" },
            },
            l = {
                name = "+Litee",
                t = { "<cmd>LTPanel<cr>", "Toggle Panel" },
            },
            r = {
                name = "+Review",
                b = { "<cmd>GHStartReview<cr>", "Begin" },
                c = { "<cmd>GHCloseReview<cr>", "Close" },
                d = { "<cmd>GHDeleteReview<cr>", "Delete" },
                e = { "<cmd>GHExpandReview<cr>", "Expand" },
                s = { "<cmd>GHSubmitReview<cr>", "Submit" },
                z = { "<cmd>GHCollapseReview<cr>", "Collapse" },
            },
            p = {
                name = "+Pull Request",
                c = { "<cmd>GHClosePR<cr>", "Close" },
                d = { "<cmd>GHPRDetails<cr>", "Details" },
                e = { "<cmd>GHExpandPR<cr>", "Expand" },
                o = { "<cmd>GHOpenPR<cr>", "Open" },
                p = { "<cmd>GHPopOutPR<cr>", "PopOut" },
                r = { "<cmd>GHRefreshPR<cr>", "Refresh" },
                t = { "<cmd>GHOpenToPR<cr>", "Open To" },
                z = { "<cmd>GHCollapsePR<cr>", "Collapse" },
            },
            t = {
                name = "+Threads",
                c = { "<cmd>GHCreateThread<cr>", "Create" },
                n = { "<cmd>GHNextThread<cr>", "Next" },
                t = { "<cmd>GHToggleThread<cr>", "Toggle" },
            },
        },
    },
}, { prefix = "<leader>" })
