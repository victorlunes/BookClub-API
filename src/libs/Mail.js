import NodeMailJet from "node-mailjet"

const mailjet = NodeMailJet.apiConnect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)

class Mail {
    async sendForgotPasswordMail(email, name, token) {
        try {
            const result = await mailjet.post('send', { version: 'v3.1'}).request({
                Messages: [
                    {
                        From: {
                            Email: "victorllunes@gmail.com",
                            Name: "victor"
                        },
                        To: [
                            {
                              Email: email,
                              Name: name,
                            }
                        ],
                        "TemplateID": 4737072,
                        "TemplateLanguage": true,
                        "Subject": "Alteração de Senha ",
                        Variables: {
                            name: name,
                            token: token
                        }
                    }
                ]
            })
            return result;


        } catch (error) {
            return { error }
        }
    }
}

export default new Mail