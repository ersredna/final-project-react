export default function CsvInputForm({ setFile, handleUpload }) {
    return (
        <div className="form-group character-form-div">
            <div className="custom-file form-input">
                <input accept=".csv" className="form-control" id="csv-file-input" name="file-import" type="file" onChange={setFile} />
            </div>
            <button className="btn form-btn" style={{width: '100%'}} onClick={handleUpload}>Upload</button>
        </div>
    )
}