export default function CharacterAddForm() {
    return (
        <div className="form-group character-form-div">
            <input className="form-control character-input" placeholder="Character"></input>
            <div className="character-btn-wrapper">
                <button className="btn character-btn">Add</button>
                <button className="btn character-btn">Delete</button>
            </div>
        </div>
    )
}