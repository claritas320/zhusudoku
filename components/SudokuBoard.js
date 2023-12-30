import React from 'react';
import styles from './SudokuBoard.module.css';

export default function SudokuBoard ({ grid }) {
    return (
        <div className={styles.sudokuBoard}>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.row}>
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} className={styles.cell}>
                            {cell !== '.' ? cell : ''}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

