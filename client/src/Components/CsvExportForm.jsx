export default function CsvExportForm({ handleExport }) {
    return (
        <div className="form-group character-form-div">
            <button className="btn form-btn" style={{width: '100%'}} onClick={handleExport}>Download</button>
        </div>
    )
}