/* eslint-disable react/prop-types */
import "./pf.css";
// eslint-disable-next-line react/prop-types
const ContextCard = ({ ContextData }) => {
  return (
    <div className="mt-16">
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 mb-5 gap-5 max-w-7xl m-auto px-5">
        {ContextData?.map((contest) => (
          <div key={contest._id} className="card card-compact bg-base-100 shadow-xl">
            <figure className="w-full max-h-48">
              <img
                src={contest.image}
                alt={contest.name +" Banner image"}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{contest.name}</h2>
              <p className="text-left">{contest.details.slice(0,80)+"..."}</p>
              <div className="card-actions items-center justify-between">
                <button className="border-b-2 border-[#1b1d4d]">Participant : {contest.participation} </button>
                <a href={`/details/`+contest._id}>
                <button className="border-2 border-[#1b1d4d] px-5 py-2 bg-[#1b1d4d] text-white rounded-lg hover:text-[#1b1d4d] hover:border-[#1b1d4d] hover:bg-white">Details</button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContextCard;
