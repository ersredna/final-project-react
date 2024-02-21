export default function CharacterList({ characters }) {
    return (
        <>
            <table className="table character-table table-head">
                <thead>
                    <tr>
                        <th>Characters</th>
                    </tr>
                </thead>
            </table>
            <div className="table-wrapper-scroll-y">
                <table className="table character-table">
                    <tbody>
                        {characters.map(character => {
                            return (
                                <tr key={character.id}>
                                    <td>{character.name}</td>
                                </tr>
                            )
                        })}                   
                    </tbody>
                </table>
            </div>
        </>
    )
}