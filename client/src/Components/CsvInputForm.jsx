export default function CsvInputForm({ setFile, handleUpload }) {
    return (
        <div className="form-group character-form-div">
            <div className="custom-file form-input">
                <input type="file" className="form-control" id="csv-file-input" accept=".csv" onChange={setFile} />
                {/* <label className="custom-file-label form-input" htmlFor="customFileLang">Select File</label> */}
            </div>
            <button className="btn form-btn" style={{width: '100%'}} onClick={handleUpload}>Upload</button>
        </div>
    )
}