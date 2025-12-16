const Mailjet = require("node-mailjet");
require("dotenv").config();


if (!process.env.MJ_APIKEY_PUBLIC || !process.env.MJ_APIKEY_PRIVATE) {
    throw new Error("ERRO: Variáveis de ambiente do Mailjet não configuradas!");
}

const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
);

const EMAIL_SEND = "ped.frsouza@gmail.com";

async function enviarEmail({ to, subject, text, html, nome }) {
    try {
        const result = await mailjet
            .post("send", { version: "v3.1" })
            .request({
                Messages: [
                    {
                        From: {
                            Email: EMAIL_SEND,
                            Name: "Sistema IoT Alerta",
                        },
                        To: [
                            {
                                Email: to,
                                Name: nome || "Usuário",
                            },
                        ],
                        Subject: subject,
                        TextPart: text,
                        HTMLPart: html,
                    },
                ],
            });

        console.log(`E-mail enviado com sucesso para ${to}`);
        return result.body;
    } catch (error) {
        console.error(
            "Falha ao enviar e-mail:",
            error.statusCode,
            error.message
        );
        throw error;
    }
}

module.exports = { enviarEmail };
