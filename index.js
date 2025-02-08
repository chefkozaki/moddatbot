const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
const { token } = require('./config.json');
const sssrc = ['Diêm Vương - 7*']
const src = ['Lốp Thức tỉnh - 6*']
const rareCharacters = ['Họa sĩ nghèo gay - 4,5*', 'Mod Đạt - 5*', 'Vỹ Gay Mặc Maid -5*'];
const commonCharacters = ['Chén Ku Cho - 4*', 'Lốp Trưởng - 4*', 'Nhà cái Yelan - $$$', 'Q.B.V- Infinity Fame', 'Linh vật N - Lốp' ];
const client = new Client({
	intents: [
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMessages, // Thêm intent này để lắng nghe tin nhắn
	  GatewayIntentBits.MessageContent, // Thêm intent này để đọc nội dung tin nhắn
	],
  });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});
//list các từ autorep
client.on('messageCreate', message => {
	// Kiểm tra nếu tin nhắn là "hi" (không phân biệt chữ hoa/chữ thường)
	if (message.content.toLowerCase() === 'bầu vỹ') {
	  // Trả lời "hello"
	  message.reply('gay! Vote mặc maid +1');
	}
  });
client.on('messageCreate', message => {
	// Kiểm tra nếu tin nhắn là "hi" (không phân biệt chữ hoa/chữ thường)
	if (message.content.toLowerCase() === 'kuchen') {
		message.reply('chén ku cho')
	}
  });
client.on('messageCreate', message => {
	const content = message.content.toLowerCase();
  
	if (content === 'mod đạt' || content === 'mod dat' || content === 'dat cabybara') {
	  message.reply('Mod Đạt đẹp trai!');
	}
  });
client.on('messageCreate', message => {
	if (message.content.toLowerCase() === 'diêm vương') {
		message.reply('Diêm Vương đẹp trai, vĩ đại muôn năm!');
	}
  });
client.on('messageCreate', message => {
	if (message.content.toLowerCase() === 'làng diêm') {
		message.reply('Làng Diêm Trường Tồn!');
	}
  });
client.on('messageCreate', message => {
	if (message.content.toLowerCase() === 'diêm') {
		message.reply('Diêm thống nhất. Thắp lửa VN');
	}
  }); 
client.on('messageCreate', message => {
	if (message.content.toLowerCase() === 'lửa') {
		message.reply('Bật lửa Thống Nhất. Giữ lửa VN');
	}
  });
client.on('messageCreate', message => {
	if (message.content.toLowerCase() === 'họa sĩ') {
		message.reply('Vừa nghèo vừa gay, gà!');
	}
  });
client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    
    const args = message.content.match('!danhde (\\d+)');
    if (args) {
        const userNumber = parseInt(args[1]);
        if (userNumber < 1 || userNumber > 100) {
            return message.reply('Hãy nhập một số từ 1 đến 100.');
        }

        const randomNumber = Math.floor(Math.random() * 100) + 1;
        if (randomNumber === userNumber) {
            message.reply(`🎉 Trúng rồi ${randomNumber}.`);
        } else {
            message.reply(`😢 Gà! Lệch rồi! Con số may mắn là ${randomNumber}, không phải ${userNumber}.`);
        }
    }
	if (message.content.startsWith('!gacha')) {
        const chance = Math.random();
        let character;
        if (chance < 0.01) {
            character = sssrc[Math.floor(Math.random() * rareCharacters.length)];
        } 
		else if (chance < 0.11) {
			character = src[Math.floor(Math.random() * rareCharacters.length)];
		}
		else if (chance < 0.41) {
			character = rareCharacters[Math.floor(Math.random() * rareCharacters.length)];
		}
		else {
            character = commonCharacters[Math.floor(Math.random() * commonCharacters.length)];
        }
        message.reply(`🎉 Bạn nhận được: ${character}!`);
    }
});
client.on('messageCreate', message => {
	if (message.content.toLowerCase() === 'gay') {
		message.reply('Gay thì sao? - Thì ngu chứ làm sao:)))');
	}
  });
client.on('messageCreate', message => {
	if (message.content.toLowerCase() === 'end') {
		message.reply('Bot sẽ tự động tắt trong 5s');
		client.destroy();
	}
  });  
client.on('messageCreate', message => {
	if (message.content.toLowerCase() === 'lốp') {
		message.reply('Lốp trưởng tuyệt đỉnh!');
	}
  });
client.login(token);
