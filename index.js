const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, MessageFlags, ActivityType } = require('discord.js');
const { token } = require('./config.json');
const sssrc = ['Diêm Vương - 7', 'Fuba - 7', 'Interpool -7', 'IE - 7', 'Lều Báo - s7']
const src = ['Lốp Thức tỉnh - 6', 'Mod Đạt Đẹp Trai - 6', 'Mod Minh -6', 'Thư kí Diêm Vương - 5,5']
const rareCharacters = ['Họa sĩ nghèo gay - 4,5', 'Vỹ Gay Mặc Maid -5'];
const commonCharacters = ['Chén Ku Cho - 4', 'Lốp Trưởng - 4', 'Nhà cái Yelan - $$$', 'Q.B.V- Infinity Fame', 'Linh vật N - Lốp' ];
const client = new Client({
	intents: [
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMessages, // Thêm intent này để lắng nghe tin nhắn
	  GatewayIntentBits.MessageContent, // Thêm intent này để đọc nội dung tin nhắn
	],
  });
let userInventory = {};
const pathinv = './inventory.json'; // Đường dẫn file lưu kho đồ



client.once('ready', () => {
    console.log(`✅ Bot đã hoạt động với tên: ${client.user.tag}`);
    client.user.setPresence({
        activities: [{ name: '!gacha', type: ActivityType.Playing }],
        status: 'online'
    });
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
client.on('messageCreate', message => {
	if (message.content.toLowerCase() === 'gay') {
		message.reply('Gay thì sao? - Thì ngu chứ làm sao:)))');
	}
  });
client.on('messageCreate', message => {
	if (message.content.toLowerCase() === 'lốp') {
		message.reply('Lốp trưởng tuyệt đỉnh!');
	}
  });
function rollCharacter() {
    const chance = Math.random();
    if (chance < 0.01) {
        return sssrc[Math.floor(Math.random() * sssrc.length)];
    } else if (chance < 0.11) {
        return src[Math.floor(Math.random() * src.length)];
    } else if (chance < 0.41) {
        return rareCharacters[Math.floor(Math.random() * rareCharacters.length)];
    } else {
        return commonCharacters[Math.floor(Math.random() * commonCharacters.length)];
    }
}
function saveInventory() {
  fs.writeFileSync(pathinv, JSON.stringify(userInventory, null, 2), 'utf8');
}
if (fs.existsSync(pathinv)) {
  userInventory = JSON.parse(fs.readFileSync(pathinv, 'utf8'));
}
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
    if (message.content === '!test') {
      message.reply(`Xin chào, @${message.author.username}! Xem các thay đổi của bot tại "!update"`);
    }
    if (message.content === '!update') {
      message.reply('📜 Phiên bản: **v1.0** \n **Các thay đổi gần đây:**\n- Thêm lệnh !test, !help  **\n Đã lưu Inventory **\n- Banner v1.0: https://cdn.discordapp.com/attachments/1337747509958672487/1337748643901341767/banner_1.jpg?ex=67a89302&is=67a74182&hm=ff2947678956f9341629a2c68815df05345d8456b86093652888921297b8cf96&' );
    }
    if (message.content === '!helpme') {
      message.reply('📜 **Danh sách lệnh:**\n- !gacha: Gacha 1 nhân vật\n- !gacha10: Gacha 10 nhân vật\n- !inv: Xem kho nhân vật\n- !top: Xem bảng xếp hạng người chơi\n- !danhde [số]: Dự đoán số từ 1 đến 100\n- !test: Kiểm tra bot')
      };
    if (message.content.startsWith('!gacha')) {
        const character = rollCharacter();
        
        if (!userInventory[message.author.id]) {
            userInventory[message.author.id] = {};
        }
        if (!userInventory[message.author.id][character]) {
            userInventory[message.author.id][character] = 0;
        }
        userInventory[message.author.id][character]++;
        saveInventory(); 
        message.reply(`🎉 Bạn nhận được: **${character}**!`);
    }
    
    if (message.content.startsWith('!gacha10')) {
        let results = [];
        if (!userInventory[message.author.id]) {
            userInventory[message.author.id] = {};
        }
        
        for (let i = 0; i < 10; i++) {
            const character = rollCharacter();
            if (!userInventory[message.author.id][character]) {
                userInventory[message.author.id][character] = 0;
            }
            userInventory[message.author.id][character]++;
            saveInventory();
            results.push(`**${character}**`);
        }
        
        message.reply(`🎉 Bạn nhận được: **${results.join(', ')}**`);
    }
    
    if (message.content.startsWith('!inv')) {
        const inventory = userInventory[message.author.id];
        if (!inventory) {
            return message.reply('📦 Bạn chưa có nhân vật nào trong kho!');
        }
        const inventoryList = Object.entries(inventory).map(([char, count]) => `${char}: ${count}`).join('\n');
        message.reply(`📦 Kho của bạn:\n**${inventoryList}**`);
    }
	if (message.content.startsWith('!top')) {
        if (Object.keys(userInventory).length === 0) {
            return message.reply('📊 Hiện chưa có ai sở hữu nhân vật nào!');
        }
        
        const leaderboard = Object.entries(userInventory)
            .map(([userId, inventory]) => {
                const totalCharacters = Object.values(inventory).reduce((sum, count) => sum + count, 0);
                return { userId, totalCharacters };
            })
            .sort((a, b) => b.totalCharacters - a.totalCharacters)
            .slice(0, 10);
        
        const leaderboardMessage = leaderboard.map((entry, index) => {
            return `#${index + 1} <@${entry.userId}> - ${entry.totalCharacters} nhân vật`;
        }).join('\n');
        
        message.reply(`🏆 **Bảng xếp hạng người chơi** 🏆\n${leaderboardMessage}`);
    }
});
client.login(token);
