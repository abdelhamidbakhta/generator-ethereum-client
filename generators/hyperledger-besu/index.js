const Generator = require('yeoman-generator');
const packageInformation = require('../../package.json');
const chalk = require('chalk');
const prompts = require('./prompts');


module.exports = class extends Generator {
    get prompting() {
        return this._prompting();
    }

    initializing() {
        this._initDefaultConfig();
        this._printWelcomeMessage();
    }

    _prompting() {
        return {
            askNetwork: prompts.askNetwork,
            askDataPath: prompts.askDataPath,
            askMiningOptions: prompts.askMiningOptions,
            askJsonRpcOptions: prompts.askJsonRpcOptions,
            askP2POptions: prompts.askP2POptions,
            askGraphqlOptions: prompts.askGraphqlOptions,
            askWsOptions: prompts.askWsOptions,
        };
    }

    /*configuring() {

    }*/

    writing() {
        this.outputConfigPath = 'besu/config.toml';
        this.fs.copyTpl(
            this.templatePath('config.toml'),
            this.destinationPath(this.outputConfigPath),
            {
                ethereumNetwork: this.ethereumNetwork,
                dataPath: this.dataPath,
                minerEnabled: this.minerEnabled,
                minerCoinbase: this.minerCoinbase,
                customGenesisPath: this.customGenesisPath,
                rpcHttpEnabled: this.rpcHttpEnabled,
                rpcHttpHost: this.rpcHttpHost,
                rpcHttpPort: this.rpcHttpPort,
                rpcHttpApis: this.rpcHttpApis,
                p2pEnabled: this.p2pEnabled,
                p2pHost: this.p2pHost,
                p2pPort: this.p2pPort,
                p2pInterface: this.p2pInterface,
                discoveryEnabled: this.discoveryEnabled,
                graphqlHttpEnabled: this.graphqlHttpEnabled,
                graphqlHttpHost: this.graphqlHttpHost,
                graphqlHttpPort: this.graphqlHttpPort,
                rpcWsEnabled: this.rpcWsEnabled,
                rpcWsHost: this.rpcWsHost,
                rpcWsPort: this.rpcWsPort,
                rpcWsApis: this.rpcWsApis,
            }
        );
        this.config.save();
    }

    /*conflicts() {

    }*/

    /*install() {

    }*/

    end() {
        this._printGoodByeMessage();
    }

    _printWelcomeMessage() {
        this.log('\n');
        this.log(`${chalk.green('\'##::::\'##:\'##:::\'##:\'########::\'########:\'########::\'##:::::::\'########:\'########:::\'######:::\'########:\'########::\n' +
            ' ##:::: ##:. ##:\'##:: ##.... ##: ##.....:: ##.... ##: ##::::::: ##.....:: ##.... ##:\'##... ##:: ##.....:: ##.... ##:\n' +
            ' ##:::: ##::. ####::: ##:::: ##: ##::::::: ##:::: ##: ##::::::: ##::::::: ##:::: ##: ##:::..::: ##::::::: ##:::: ##:\n' +
            ' #########:::. ##:::: ########:: ######::: ########:: ##::::::: ######::: ##:::: ##: ##::\'####: ######::: ########::\n' +
            ' ##.... ##:::: ##:::: ##.....::: ##...:::: ##.. ##::: ##::::::: ##...:::: ##:::: ##: ##::: ##:: ##...:::: ##.. ##:::\n' +
            ' ##:::: ##:::: ##:::: ##:::::::: ##::::::: ##::. ##:: ##::::::: ##::::::: ##:::: ##: ##::: ##:: ##::::::: ##::. ##::\n' +
            ' ##:::: ##:::: ##:::: ##:::::::: ########: ##:::. ##: ########: ########: ########::. ######::: ########: ##:::. ##:\n' +
            '..:::::..:::::..:::::..:::::::::........::..:::::..::........::........::........::::......::::........::..:::::..::\n' +
            ':::::::::::::::::::::\'########::\'########::\'######::\'##::::\'##::::::::::::::::::::::::::::::::::::::::::::::::::::  \n' +
            '::::::::::::::::::::: ##.... ##: ##.....::\'##... ##: ##:::: ##::::::::::::::::::::::::::::::::::::::::::::::::::::  \n' +
            '::::::::::::::::::::: ##:::: ##: ##::::::: ##:::..:: ##:::: ##::::::::::::::::::::::::::::::::::::::::::::::::::::  \n' +
            '::::::::::::::::::::: ########:: ######:::. ######:: ##:::: ##::::::::::::::::::::::::::::::::::::::::::::::::::::  \n' +
            '::::::::::::::::::::: ##.... ##: ##...:::::..... ##: ##:::: ##::::::::::::::::::::::::::::::::::::::::::::::::::::  \n' +
            '::::::::::::::::::::: ##:::: ##: ##:::::::\'##::: ##: ##:::: ##::::::::::::::::::::::::::::::::::::::::::::::::::::  \n' +
            '::::::::::::::::::::: ########:: ########:. ######::. #######:::::::::::::::::::::::::::::::::::::::::::::::::::::  \n' +
            ':::::::::::::::::::::........:::........:::......::::.......::::::::::::::::::::::::::::::::::::::::::::::::::::::  ')}`);
        this.log(chalk.blue('https://github.com/hyperledger/besu'));
        this.log(`Full documentation at: ${chalk.magenta('https://besu.hyperledger.org/')}`);
        this.log(chalk.white('Welcome to Hyperledger Besu config generator ') + chalk.yellow(`v${packageInformation.version}`));
        this.log(chalk.white(`Application files will be generated in folder: ${chalk.yellow(process.cwd())}`));
    }

    _printGoodByeMessage() {
        this.log('Configuration file is ready: ', chalk.yellow(`${process.cwd()}/${this.outputConfigPath}`));
        this.log(`${chalk.underline.blue('Note:')} if Hyperledger Besu is not installed go to ${chalk.yellow('https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Install-Binaries/')}`);
        this.log('Run Hypderledger Besu with: ', chalk.yellow(`besu --config-file=${process.cwd()}/${this.outputConfigPath}`));
        this.log(chalk.greenBright.bold(`Goodbye!`));
    }

    _initDefaultConfig() {
        this.outputConfigPath = '';
        // JSON RPC default options
        this.rpcHttpHost = JSON.stringify('127.0.0.1');
        this.rpcHttpPort = 8545;
        this.rpcHttpApis = '["ETH","NET","WEB3"]';
        // P2P default options
        this.p2pHost = JSON.stringify('127.0.0.1');
        this.p2pPort = 30303;
        this.p2pInterface = JSON.stringify('0.0.0.0');
        this.discoveryEnabled = true;
        // GraphQL default options
        this.graphqlHttpHost = JSON.stringify('127.0.0.1');
        this.graphqlHttpPort = 8547;
        // JSON RPC default options
        this.rpcWsHost = JSON.stringify('127.0.0.1');
        this.rpcWsPort = 8546;
        this.rpcWsApis = '["ETH","NET","WEB3"]';
    }
};