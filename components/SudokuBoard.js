import styles from './SudokuBoard.module.css';

function Cell({ value, cellIndex, selectedCell, onSelectedCellChange }) {
    const isSelectedCell = selectedCell && cellIndex[0] == selectedCell[0] && cellIndex[1] == selectedCell[1];
    const style = isSelectedCell ? { 'backgroundColor': 'aqua' } : {};
    return (
        <div style={style} className={styles.cell} onClick={() => onSelectedCellChange(cellIndex)}>
            <span>{value !== '.' ? value : ''}</span>
        </div>
    );
};

export default function SudokuBoard({ grid, onGridChange, selectedCell, onSelectedCellChange }) {
    return (
        <div className={styles.sudokuBoard}>
            {grid.map((row, rowIndex) => (
                <div key={'row' + rowIndex} className={styles.row}>
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={'grid' + rowIndex + colIndex}
                            value={cell}
                            cellIndex={[rowIndex, colIndex]}
                            selectedCell={selectedCell}
                            onSelectedCellChange={onSelectedCellChange}
                        ></Cell>
                    ))}
                </div>
            ))}
        </div>
    );
};

