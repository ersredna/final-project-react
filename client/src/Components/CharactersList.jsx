export default function CharactersList({ characters }) {
    return (
        <>
            <table className="table characters-table table-head">
                <thead>
                    <tr>
                        <th>Characters</th>
                    </tr>
                </thead>
            </table>
            <div className="characters-table-wrapper-scroll-y">
                <table className="table characters-table">
                    <tbody>
                        {characters ? characters.map(character => {
                                return (
                                    <tr key={character.id}>
                                        <td>{character.name}</td>
                                    </tr>
                                )
                            }) : 
                            <tr>
                                <td>No Characters</td>
                                <td>No Characters</td>
                            </tr>
                        }                   
                    </tbody>
                </table>
            </div>
        </>
    )
}