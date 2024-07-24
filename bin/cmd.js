#!/usr/bin/env node

import minifymix from '../index.js';

function useage() {
    console.log("Usage: minifyMix <input_file> <isMix>\n  isMix default is true");
}

if (process.argv.length ===3 && process.argv[2]) {
    minifymix(process.argv[2], true);
}else if(process.argv.length ===4 && process.argv[2] && process.argv[3]){
    const isMix = process.argv[3].toLowerCase() === "true";
    minifymix(process.argv[2], isMix);
}else{
    useage();
}
