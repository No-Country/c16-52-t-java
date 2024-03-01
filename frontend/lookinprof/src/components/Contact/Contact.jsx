import React from "react";
import mountain from "../../assets/montain.png";
import manSettings from "../../assets/manSettings.svg";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";


const Contact = () => {
  return (
    <div className=" flex flex-col-reverse lg:relative h-screen flex lg:justify-center items-center" style={{
      backgroundImage: `url(${mountain})`,
      backgroundSize: "cover",
    }}>
        <img
        src={manSettings}
        alt="manSettings"
        className="absolute left-0 p-[43px] hidden lg:block"
      />
    

      <div className="shadow-2xl rounded-3xl shadow-gray-400 px-20 py-20 flex flex-col justify-between w-1/3 z-10  bg-white relative left-[390px]">
        <div>
          <Typography variant="h3" gutterBottom>
            Contactanos
          </Typography>

          <Typography paragraph={true}>
            Envianos tu consulta a nuestro mail
          </Typography>
        </div>

        <form className="flex flex-col align-items: center justify-content: center space-y-5 ">
          <TextField
            label="Nombre y Apellido"
            placeholder="Nombre y Apellido"
            variant="outlined"
            required
          />
          <TextField
            label="Correo Electrónico"
            placeholder="Correo Electrónico"
            variant="outlined"
            required
          />
          <TextField
            label="Asunto"
            placeholder="Asunto"
            variant="outlined"
            required
          />
          <TextareaAutosize
            maxRows={5}
            aria-label="maximum height"
            placeholder="Descripción"
          />

          <Button variant="contained">Enviar</Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
