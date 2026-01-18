import React from "react";

export default function TeamMember({ team }) {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {team.map((member, index) => (
        <div
          key={index}
          className="w-60 rounded-lg shadow-xl p-4 text-center border border-gray-700"
        >
          <img
            src={member.img}
            alt={`Team Member ${index + 1}`}
            className="w-32 h-32 object-cover mx-auto rounded-full mb-3"
          />
          <h3 className="text-lg flex justify-center items-center font-semibold text-white mb-1">
            {member.name}
            {member.url && (
              <a
                className="h-8 w-8 ml-2 text-center flex justify-center items-center transition-colors duration-300"
                href={member.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#0078d4"
                    d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"
                  ></path>
                </svg>
              </a>
            )}
          </h3>

          <p className="text-indigo-400 text-sm mb-1">Role: {member.prof}</p>
          {member.desc && (
            <p className="text-gray-400 text-sm">{member.desc}</p>
          )}
        </div>
      ))}
    </div>
  );
}
