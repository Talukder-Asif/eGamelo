
const Home = () => {
    const handelForm = (e) =>{
        e.preventDefault();
        console.log(e.target.image.value)
    }
    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
      };
    return (
        <div>
            <h1 className="text-7xl text-center">This is Home page</h1>



            <div className="mt-96">
                <form onSubmit={handelForm}>
                <input type="file" onChange={handleFileChange} name="image" className="file-input file-input-bordered w-full max-w-xs" />
                <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Home;