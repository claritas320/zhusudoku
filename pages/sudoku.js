import React from 'react';
// import SudokuBoard from '../components/SudokuBoard';
import sudoku from '../components/sudoku';
import dynamic from 'next/dynamic'
 
const  SudokuBoard = dynamic(() => import('../components/SudokuBoard'), { ssr: false })
export default function Sudoku() {
    const str = sudoku.generate('easy');
    const grid = sudoku.board_string_to_grid(str);
    return (
        <div>
            <h1>Sudoku Game</h1>
            <SudokuBoard grid={grid}></SudokuBoard>
        </div>
    );
}

function generateSudokuGrid() {
    const grid = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            // Generate a random number between 0 and 9
            const randomNumber = Math.floor(Math.random() * 10);
            row.push(randomNumber);
        }
        grid.push(row);
    }
    return grid;
}
