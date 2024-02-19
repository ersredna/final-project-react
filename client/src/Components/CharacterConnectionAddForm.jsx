export default function CharacterConnectionAddForm() {
    return (
        <div className="form-group character-form-div">
            <input className="form-control character-input" placeholder="Source"></input>
            <input className="form-control character-input" placeholder="Target"></input>
            <div className="character-btn-wrapper">
                <button className="btn character-btn">Add</button>
                <button className="btn character-btn">Delete</button>
            </div>
        </div>
    )
}