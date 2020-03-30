import React from 'react'
import s from './Table.module.css';

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tables: [
                { id: 1 ,name: 'Юнилайн', namber: 21, series: '2' },
                { id: 2 ,name: 'Юнилайн', namber: 21, series: '5' },
                { id: 3 , name: 'Юнилайн', namber: 21, series: '8' },
                { id: 4 , name: 'Юнилайн', namber: 23, series: '2' },
                { id: 5 , name: 'Юнилайн', namber: 23, series: '5' },
                { id: 6 , name: 'Юнилайн', namber: 25, series: '3' },
                { id: 7 , name: 'Юнилайн', namber: 25, series: '4' },
            ]
        }
    }

    renderTableHeader() {
        let header = Object.keys(this.state.tables[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        return this.state.tables.map((table, index) => {
            const {id, name,namber ,series  } = table //destructuring
            return (
                <tr key ={id} >
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{namber}</td>
                    <td>{series}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <h1 className={s.title}>Таблица Матриц</h1>
                <table className={s.tables}>
                    <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Table;