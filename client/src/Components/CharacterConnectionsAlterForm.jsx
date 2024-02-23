export default function CharacterConnectionsAlterForm({ connInputS, onChange, connInputT, addConnection, deleteConnection }) {
    return (
        <div className="form-group character-form-div">
            <input className="form-control form-input" id="connection-input-source" onChange={onChange} placeholder="Source" value={connInputS}></input>
            <input className="form-control form-input" id="connection-input-target" onChange={onChange} placeholder="Target" value={connInputT}></input>
            <div className="form-btn-wrapper">
                <button className="btn form-btn" onClick={addConnection}>Add</button>
                <button className="btn form-btn" onClick={deleteConnection}>Remove</button>
            </div>
        </div>
    )
}