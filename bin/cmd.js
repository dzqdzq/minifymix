#!/usr/bin/env node

import minifymix from '../index.js';

function useage() {
    console.log("Usage: minifyMix <input_file>");
}

if (process.argv.length ===3 && process.argv[2]) {
    minifymix(process.argv[2])
}else{
    useage();
}
