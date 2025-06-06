#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoe-interactive-18989-49987b6b/tic_tac_toe_interactive
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

