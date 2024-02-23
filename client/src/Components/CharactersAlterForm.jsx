export default function CharactersAlterForm({ charInput, onChange, addCharacter, deleteCharacter }) {
    return (
        <div className="form-group character-form-div">
            <input className="form-control form-input" id="character-input" onChange={onChange} placeholder="Character" value={charInput}></input>
            <div className="form-btn-wrapper">
                <button className="btn form-btn" onClick={addCharacter}>Add</button>
                <button className="btn form-btn" onClick={deleteCharacter}>Remove</button>
            </div>
        </div>
    )
}