import { proxy, useSnapshot, ref, snapshot, subscribe } from "valtio";

//Borrador reporte klean vet
// const Report = (data) => (
//   <div style={{ display: "flex", flexWrap: "wrap" }}>
//     <div>
//       <label>Nombre</label>
//       <div>{data.name}</div>
//     </div>
//     <div>
//       <label>e-mail</label>
//       <div>{data.email}</div>
//     </div>
//     <div>
//       <label>Tarjeta</label>
//       <div>{data.card}</div>
//     </div>
//     <div>
//       <label>Telefono</label>
//       <div>{data.telephone}</div>
//     </div>
//     <div>
//       <label>ID prescripciones</label>
//       <div>{data.ID_prescripciones}</div>
//     </div>
//     <div>
//       <label>Fecha prescripciones</label>
//       <div>{data.Fecha_prescripciones}</div>
//     </div>
//     <div>
//       <label>Unidades</label>
//       <div>{data.units}</div>
//     </div>
//     <div>
//       <label>Codigos de promocion</label>
//       <div>{data.promotionCodes}</div>
//     </div>
//     <div>
//       <label>Paga</label>
//       <div>{data.paga}</div>
//     </div>
//     <div>
//       <label>Regalo por</label>
//       <div>{data.gift_by}</div>
//     </div>
//     <div>
//       <label>Ganada por</label>
//       <div>{data.ganadaPorElUsuario}</div>
//     </div>
//   </div>
// );
export const assetsModels = {
  prescriptions: {
    label: "💉 PRESCRIPCIONES",
    listUI: (asset) => (
      <>
        <label>_id</label>
        <div>{asset._id}</div>
        <label>Medicación</label>
        <div>{asset.medicacion}</div>
        <label>Dosis</label>
        <div>{asset.dosis}</div>
        <label>Frecuencia</label>
        <div>{asset.frecuencia}</div>
        <label>Instrucciones</label>
        <div>{asset.instrucciones}</div>
      </>
    ),
    searchKeys: ["_id", "medicacion", "dosis", "frecuencia", "instrucciones"],
  },
  reports: {
    label: "📋 REPORTES",
    listUI: (asset) => (
      <>
        <label>_id</label>
        <div>{asset._id}</div>
        <label>REPORTE</label>
        <div>{asset.report}</div>
        <label>ID prescripción relacionada</label>
        <div>{asset.prescriptionId}</div>
      </>
    ),
    searchKeys: ["_id", "report", "prescriptionId"],
  },
};
const state = proxy({
  reports: [
    {
      _id: "1234",
      prescriptionId: "abc",
      report:
        "🐶 Este es un reporte ficticio que no existe, es para un perro virtual que se le descuadro un byte",
    },
    {
      _id: "5678",
      prescriptionId: "def",
      report:
        "😸 Reporte de la prescripcion recetada a un gato cibernetico. Ya esta conectado a github.",
    },
    {
      _id: "4356",
      prescriptionId: "ghi",
      report:
        "🐵 Mono es un mico con mucho billete porque recibe todos los pagos, hay que darle un tratamiento mas adecuado.",
    },
    {
      _id: "91011",
      prescriptionId: "jkl",
      report:
        "🐦 Reporte de la prescripcion para un pájaro que necesita más tiempo en el sol.",
    },
    {
      _id: "121314",
      prescriptionId: "mno",
      report:
        "🐠 Reporte de la prescripcion para un pez que necesita más agua.",
    },
    {
      _id: "151617",
      prescriptionId: "pqr",
      report:
        "🌵 Reporte de la prescripcion para un cactus que necesita más agua.",
    },
    {
      _id: "181920",
      prescriptionId: "stu",
      report:
        "🤖 Reporte de la prescripcion para un robot que necesita más baterías.",
    },
    {
      _id: "212223",
      prescriptionId: "vwx",
      report:
        "👽 Reporte de la prescripcion para un extraterrestre que necesita más estrellas.",
    },
    {
      _id: "242526",
      prescriptionId: "yz0",
      report:
        "🦄 Reporte de la prescripcion para un unicornio que necesita más caramelos.",
    },
    {
      _id: "272829",
      prescriptionId: "123",
      report:
        "🐉 Reporte de la prescripcion para un dragón que necesita más fuego.",
    },
  ],
  prescriptions: [
    {
      _id: "abc",
      medicacion: "Vitamina B12",
      dosis: "1000 mcg",
      frecuencia: "Una vez a la semana",
      instrucciones: "Tomar con un vaso de agua completo.",
    },
    {
      _id: "def",
      medicacion: "Felisin",
      dosis: "20 mg",
      frecuencia: "Dos veces al día",
      instrucciones: "Tomar antes de las comidas.",
    },
    {
      _id: "ghi",
      medicacion: "Mono-Bill",
      dosis: "500 mg",
      frecuencia: "Una vez al día",
      instrucciones: "Tomar con alimentos.",
    },
    {
      _id: "jkl",
      medicacion: "Serum de Sol",
      dosis: "10 ml",
      frecuencia: "Dos veces al día",
      instrucciones: "Aplicar en plumas.",
    },
    {
      _id: "mno",
      medicacion: "Aqua-Fresh",
      dosis: "1 litro",
      frecuencia: "Diariamente",
      instrucciones: "Llenar el tanque diariamente.",
    },
    {
      _id: "pqr",
      medicacion: "Cuidado de Cactus",
      dosis: "200 ml",
      frecuencia: "Semanalmente",
      instrucciones: "Regar completamente.",
    },
    {
      _id: "stu",
      medicacion: "Batería de Recarga",
      dosis: "1000 mAh",
      frecuencia: "Mensualmente",
      instrucciones: "Reemplazar con una nueva batería.",
    },
    {
      _id: "vwx",
      medicacion: "Estrella Observadora",
      dosis: "1000 estrellas",
      frecuencia: "Nocturnamente",
      instrucciones: "Colocar en la habitación.",
    },
    {
      _id: "yz0",
      medicacion: "Cura de Caramelo",
      dosis: "100g",
      frecuencia: "Diariamente",
      instrucciones: "Comer con una sonrisa.",
    },
    {
      _id: "123",
      medicacion: "Llama de Dragón",
      dosis: "500 ml",
      frecuencia: "Una vez a la semana",
      instrucciones: "Usar con moderación.",
    },
  ],
});
export default state;
export const useAssets = () =>
  typeof window !== "undefined" ? useSnapshot(state) : snapshot(state);
