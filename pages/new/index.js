import Link from "next/link";

export default function New() {
    return <div className="container mt-5">
        <h1>Create a new markdown</h1>
        <p>Share knowledge about any topic!</p>
        <div className="row mt-5">
            <div className="col-md">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">Create a markdown</h2>
                        <p className="card-text">Use our editor to create a markdown file about any topic!</p>
                        <Link href="/new/create"><a className="btn btn-primary">Create</a></Link>
                    </div>
                </div>
            </div>
            <div className="col-md">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">Upload from computer</h2>
                        <p className="card-text">Upload a markdown file that you have already created.</p>
                        <Link href="/new/upload"><a className="btn btn-primary">Upload</a></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}