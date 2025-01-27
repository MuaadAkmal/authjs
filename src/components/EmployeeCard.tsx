import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import { Hash, Mail, MapPin, Phone, User } from "lucide-react";
import { RefinedUser } from "@/context/employeeSearchProvidor";

type TEmployeeProp = {
  employee: RefinedUser;
};

export default function EmployeeCard({ employee }: TEmployeeProp) {
  return (
    <div className="p-4 bg-white rounded-lg  ring-1 ring-black/10">
      <div className="flex items-center mb-4">
        <Avatar className="h-12 w-12 mr-4">
          <AvatarImage
            src={"/emp_img/" + employee.emp_id + ".jpg"}
            alt={employee.name}
            className="w-full"
          />
          <AvatarFallback className="bg-slate-600/10 text-center w-full flex items-center justify-center">
            <User />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {employee.name}
          </h3>
          <p className="text-sm text-gray-600">{employee.group}</p>
        </div>
      </div>
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2 text-gray-400" />
          <span>{employee.email}</span>
        </div>
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-gray-400" />
          <span>{employee.emp_id}</span>
        </div>
        <div className="flex items-center">
          <Hash className="h-4 w-4 mr-2 text-gray-400" />
          <span>PBX: {employee.pbx}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
          <span>{employee.location}</span>
        </div>
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2 text-gray-400" />
          <span>{employee.mobile}</span>
        </div>
      </div>
    </div>
  );
}
