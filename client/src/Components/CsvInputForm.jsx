export default function CsvInputForm() {
    return (
        <div className="form-group character-form-div">
            <div className="custom-file form-input">
                <input type="file" className="custom-file-input form-input" id="customFileLang" />
                <label className="custom-file-label form-input" htmlFor="customFileLang">Select File</label>
            </div>
            <button className="btn form-btn" style={{width: '100%'}}>Upload</button>
        </div>
    )
}