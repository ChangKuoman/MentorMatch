const { 
    createBot,
    createProvider, 
    createFlow, 
    addKeyword
} = require('@bot-whatsapp/bot')

const { EVENTS } = require('@bot-whatsapp/bot');

const WsProvider = require('@bot-whatsapp/provider/baileys')
const DBProvider = require('@bot-whatsapp/database/mock')

const QRPortal = require('@bot-whatsapp/portal')

const flujo1 = addKeyword('1')
    .addAnswer('Describe tu problema')

const flujoPrincipal = addKeyword('Hola')
    .addAnswer(['Bienvenido al soporte Técnico de MENTORMATCH',
                '1. Problemas al iniciar Sesion',
                '2. Reportar un bug',
                '3. Problema con los pagos'])
    .addAnswer('¿En qué puedo ayudarte?\nResponda 1, 2 o 3')
    .addAction({ capture:true }, async (ctx, {flowDynamic, gotoFlow }) => {
        const option = parseInt(ctx.body);
        switch (option) {
            case 1: return flowDynamic('Especifica el problema que estás experimentando')
            case 2: return flowDynamic('Describa el bus que está observando')
            case 3: return flowDynamic('Especifique el problema')
        }
        await gotoFlow(flujoFinal)
    })


const flujoFinal = addKeyword(EVENTS.ACTION)
    .addAnswer('En breve se contactará un asesor contigo')

const main = async () => {
    const adapterDB = new DBProvider();
    const adapterFlow = createFlow([flujoPrincipal]);
    const adapterProvider = createProvider(WsProvider);

    createBot(
        {
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB
        }
    )
    QRPortal({port:4001})
}
main()