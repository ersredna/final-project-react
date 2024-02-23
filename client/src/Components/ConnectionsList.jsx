export default function ConnectionsList({ connInputS, connInputT, connections }) {
    let filteredConn = [{ source: 'error loading', target: 'error loading'}]
    
    if (connections) {   
        const reS = new RegExp(connInputS, 'i')
        const reT = new RegExp(connInputT, 'i')

        filteredConn = connections.filter((connection) => {
            if (!reS.test(connection.source)) return false
            if (!reT.test(connection.target)) return false
            
            return true
        })
    }

    return (
        <>
            <table className="table connections-table table-head">
                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Target</th>
                    </tr>
                </thead>
            </table>
            <div className="connections-table-wrapper-scroll-y">
                <table className="table connections-table">
                    <tbody>
                        {filteredConn.map(connection => {
                            return (
                                <tr key={connection.id}>
                                    <td style={{paddingRight: '0px'}}>{connection.source}</td>
                                    <td style={{width: '20px', paddingLeft: '0', paddingRight: '0'}}>&#8594;</td>
                                    <td style={{paddingLeft: '0px'}}>{connection.target}</td>
                                </tr>
                            )
                        })}                   
                    </tbody>
                </table>
            </div>
        </>
    )
}