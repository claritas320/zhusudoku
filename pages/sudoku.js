
import React from 'react';
// import SudokuBoard from '../components/SudokuBoard';
import sudoku from '../components/sudoku';
import dynamic from 'next/dynamic'
import styles from '../styles/Sudoku.module.css';
import { useState, useEffect } from "react";
import { saveGridToDatabase } from './db';
import { insertData } from './add-puzzel';
import SelectGame from './SelectGame';


const SudokuBoard = dynamic(() => import('../components/SudokuBoard'), { ssr: false })
export default function Sudoku() {
    const str = sudoku.generate('easy');
    const [grid, setGrid] = useState(sudoku.board_string_to_grid(str));
    const [selectedCell, setSelectedCell] = useState(null);

    function newGame() {
        const str = sudoku.generate('easy');
        const newGrid = sudoku.board_string_to_grid(str);
        setGrid(newGrid);
      
        // 将 `grid` 数据保存到数据库表 `puzzles`
        saveGridToDatabase(newGrid);
        // 调用插入数据函数
        insertData();

    }

    function checkResult() {
    }

    function checkLastStep(){
    }



    useEffect(() => {
        const handleKeyDown = (event) => {
            console.log('Key pressed:', event.key);
            const key = parseInt(event.key, 10); // Convert the key to a number

            if (key >= 1 && key <= 9 && selectedCell) {
                const i = selectedCell[0];
                const j = selectedCell[1];
                console.log(i,j,grid[i][j]);
                if (grid[i][j]=='.') {
                    const newGrid = grid.slice();
                    newGrid[i][j] = key;
                    setGrid(newGrid);
                }
            }
        };

        // Adding event listener
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup function
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedCell]);

    return (
        <div className={styles.container}>
            <h1>Sudoku Game</h1>
            <SudokuBoard
                grid={grid}
                onGridChange={setGrid}
                selectedCell={selectedCell}
                onSelectedCellChange={setSelectedCell}
            >
            </SudokuBoard>
            <div>
                <button onClick={() => newGame()}>New Game</button>
                <button onClick={() => checkResult()}>Check</button>
                <button onClick={() => checkLastStep()}>LastStep</button>
                <SelectGame />
            </div>
        </div>
    );
}
