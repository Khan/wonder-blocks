" Wonder Block's Project-Specific .vimrc

" To allow your vim to use project specific vimrcs put `set exrc` in your
" `~/.vimrc` somewhere.  If you enable this, it’s also a good idea to add
" `set secure` to the end of your ~/.vimrc to disable unsafe commands in
" your project-specific .vimrc files.

" References
" Khan Academy docs on using Vim with webapp:
"   - https://docs.google.com/document/d/11iJKF4B3T05AE3279qV0TDisphthTW5LYPxa-P9PRCw/edit#bookmark=id.7rbi02votynu
"   - https://khanacademy.atlassian.net/browse/ADR-73
"   - https://andrew.stwrt.ca/posts/project-specific-vimrc/

" Asynchronous Lint Engine (ALE) {{{
" Github link for ALE: https://github.com/w0rp/ale

let g:ale_linters = {
\   'javascript': [
\       'flow',
\       'eslint',
\   ],
\}

let g:ale_fixers = {
\   'javascript': [
\       'eslint',
\       'prettier_eslint',
\       'trim_whitespace',
\       'remove_trailing_lines',
\   ],
\}

" }}}
