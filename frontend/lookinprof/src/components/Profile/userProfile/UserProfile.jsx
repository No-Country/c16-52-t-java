import React from "react";
import profile from "../../../assets/profile.svg";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const UserProfile = () => {
  return (
    <div className="flex justify-center m-10">
      <div className="shadow-2xl rounded-3xl shadow-gray-400 bg-slate-200 w-1/3 flex items-center relative left-40">
        <img src={profile} alt="man with laptop" className="max-w-64 ml-20 mr-70 z-20"></img>
      </div>

      <div className="shadow-2xl rounded-3xl shadow-gray-400 px-20 py-20 flex flex-col justify-between w-[600] z-10  bg-white">
        <div className="text-center">
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb:8 }}>
            Ivanna Roxanne
          </Typography>
          <div className="text-center space-y-5">
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Miembro desde:
              <Typography variant="subtitle1" gutterBottom>
                Agosto 2022
              </Typography>
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Lugar de residencia:
              <Typography variant="subtitle1" gutterBottom>
                Argentina, Buenos Aires
              </Typography>
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Contacto:
              <Typography variant="subtitle1" gutterBottom>
                ivana@hmtil.es
              </Typography>
            </Typography>
          </div>
        </div>

        <Button variant="contained" sx={{ fontWeight: "bold", mt:8 }}>Editar perfil </Button>
      </div>
    </div>
  );
};

export default UserProfile;
