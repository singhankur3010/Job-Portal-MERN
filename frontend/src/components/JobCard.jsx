import React from "react";

const JobCard = ({ job }) => {
  return (
    <div>
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <button>Apply Now</button>
    </div>
  );
};

export default JobCard;
