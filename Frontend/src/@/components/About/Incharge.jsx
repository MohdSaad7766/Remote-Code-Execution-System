export default function Incharge({ teamIncharge }) {
  return (
   <div className="flex flex-wrap justify-center gap-8">
     {teamIncharge.map((member, index) => (
       <div
         key={index}
         className="w-60  rounded-lg shadow-xl p-4 text-center border border-gray-700"
       >
         <img
           src={member.img}
           alt={`Team Member ${index + 1}`}
           className="w-32 h-32 object-cover mx-auto rounded-full mb-3"
         />
         <h3 className="text-lg flex justify-center align-middle place-items-center font-semibold text-white mb-1">
           {member.name}  
         </h3>
         
         <p className="text-indigo-400 text-sm mb-1">Role: {member.prof}</p>
        
          
       </div>
     ))}
   </div>

  );
}