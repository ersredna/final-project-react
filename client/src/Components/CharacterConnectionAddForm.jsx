export default function CharacterConnectionAddForm({ connInputS, onChange, connInputT, getCharacters }) {
    return (
        <div className="form-group character-form-div">
            <input className="form-control character-input" id="connection-input-source" onChange={onChange} placeholder="Source" value={connInputS}></input>
            <input className="form-control character-input" id="connection-input-target" onChange={onChange} placeholder="Target" value={connInputT}></input>
            <div className="character-btn-wrapper">
                <button className="btn character-btn" onClick={getCharacters}>Add</button>
                <button className="btn character-btn">Delete</button>
            </div>
        </div>
    )
}