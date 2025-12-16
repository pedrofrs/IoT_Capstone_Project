const mailService = require("./mailService");
const { gerarTemplateAlarme } = require("../templates/alarmEmailTemplate");

class AlarmNotificationService {

    async enviarAlertaEmail(dadosAlarme) {
        const { subject, text, html } = gerarTemplateAlarme(dadosAlarme);

        await mailService.enviarEmail({
            to: "ped.frsouza@gmail.com",
            subject,
            text,
            html
        });
    }
}

module.exports = new AlarmNotificationService();
