export default function CharacterAddForm({ charInput, onChange, addCharacter, deleteCharacter }) {
    return (
        <div className="form-group character-form-div">
            <input className="form-control character-input" id="character-input" onChange={onChange} placeholder="Character" value={charInput}></input>
            <div className="character-btn-wrapper">
                <button className="btn character-btn" onClick={addCharacter}>Add</button>
                <button className="btn character-btn" onClick={deleteCharacter}>Delete</button>
            </div>
        </div>
    )
}