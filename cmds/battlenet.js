const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

    let {body} = await superagent
    .get(`https://eu.api.blizzard.com/data/wow/token/index?namespace=dynamic-eu&locale=en_GB&access_token=USijecPKUPiaRJx3liqu9SM4N3E9mycnHh`);

    // let response2 = await superagent.get(`https://us.api.blizzard.com/data/wow/media/item/${itemid}?namespace=static-us&locale=en_US&access_token=USutcOfudocNRNHvbvUPAzTTaDnc9C2bLE`);
    // let body2 = response2.body;

    var token_price = body.price;
    var result_price = token_price / 10000;
    var number = result_price;
    number.toLocaleString();
    var divided_price = number.toLocaleString();
    
    let embed = new Discord.MessageEmbed()
    embed.setColor('BLUE')
    embed.setTitle('WoW Token')
    embed.setThumbnail('https://wowtokenprices.com/assets/wowtoken-compressed.png')
    embed.setDescription(`**Current Price:** ${divided_price} Gold`)
    embed.setFooter(`
The price is always up-to-date.
The information above is for all regions except China.
    `);

    message.channel.send(embed);

}

module.exports.help = {
    name: "token"
}