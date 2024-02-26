import React from "react";
import man from "../../assets/manLaptop.png";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

const Contact = () => {
  return (
    <div className="flex justify-center">
      <div className="shadow-2xl rounded-3xl shadow-gray-400 bg-slate-200 w-1/3 flex items-center relative left-40">
        <img src={man} alt="man with laptop" className="z-20"></img>
      </div>

      <div className="shadow-2xl rounded-3xl shadow-gray-400 px-20 py-20 flex flex-col justify-between w-1/3 z-10  bg-white">
        <div>
          <Typography variant="h3" gutterBottom>
            Contactanos
          </Typography>

          <Typography paragraph={true}>
            Envianos tu consulta a nuestro mail
          </Typography>
        </div>

        <form className="flex flex-col align-items: center justify-content: center space-y-5">
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
