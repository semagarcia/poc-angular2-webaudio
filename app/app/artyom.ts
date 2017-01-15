interface ArtyomWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
  SpeechSynthesisUtterance: any;
}

interface SpeechRecognition extends EventTarget {
    grammars: SpeechGrammarList;
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    serviceURI: string;
    start(): void;
    stop(): void;
    abort(): void;
    onaudiostart: (ev: Event) => any;
    onsoundstart: (ev: Event) => any;
    onspeechstart: (ev: Event) => any;
    onspeechend: (ev: Event) => any;
    onsoundend: (ev: Event) => any;
    onresult: (ev: SpeechRecognitionEvent) => any;
    onnomatch: (ev: SpeechRecognitionEvent) => any;
    onerror: (ev: SpeechRecognitionError) => any;
    onstart: (ev: Event) => any;
    onend: (ev: Event) => any;
}

interface SpeechRecognitionStatic {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
}

declare var SpeechRecognition: SpeechRecognitionStatic;
declare var webkitSpeechRecognition: SpeechRecognitionStatic;

interface SpeechRecognitionError extends Event {
    error: string;
    message: string;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognitionResult {
    length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
}

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
    interpretation: any;
    emma: Document;
}

interface SpeechGrammar {
    src: string;
    weight: number;
}

interface SpeechGrammarStatic {
    prototype: SpeechGrammar;
    new (): SpeechGrammar;
}

declare var SpeechGrammar: SpeechGrammarStatic;
declare var webkitSpeechGrammar: SpeechGrammarStatic;

interface SpeechGrammarList {
    length: number;
    item(index: number): SpeechGrammar;
    [index: number]: SpeechGrammar;
    addFromURI(src: string, weight: number): void;
    addFromString(string: string, weight: number): void;
}

interface SpeechGrammarListStatic {
    prototype: SpeechGrammarList;
    new (): SpeechGrammarList;
}

declare var SpeechGrammarList: SpeechGrammarListStatic;
declare var webkitSpeechGrammarList: SpeechGrammarListStatic;

interface SpeechSynthesis extends EventTarget {
    pending: boolean;
    speaking: boolean;
    paused: boolean;

    onvoiceschanged: (ev: Event) => any;
    speak(utterance: SpeechSynthesisUtterance): void;
    cancel(): void;
    pause(): void;
    resume(): void;
    getVoices(): SpeechSynthesisVoice[];
}

interface SpeechSynthesisGetter {
    speechSynthesis: SpeechSynthesis;
}

declare var speechSynthesis: SpeechSynthesis;

interface SpeechSynthesisUtterance extends EventTarget {
    text: string;
    lang: string;
    voice: SpeechSynthesisVoice;
    volume: number;
    rate: number;
    pitch: number;

    onstart: (ev: SpeechSynthesisEvent) => any;
    onend: (ev: SpeechSynthesisEvent) => any;
    onerror: (ev: SpeechSynthesisErrorEvent) => any;
    onpause: (ev: SpeechSynthesisEvent) => any;
    onresume: (ev: SpeechSynthesisEvent) => any;
    onmark: (ev: SpeechSynthesisEvent) => any;
    onboundary: (ev: SpeechSynthesisEvent) => any;
}

interface SpeechSynthesisUtteranceStatic {
    prototype: SpeechSynthesisUtterance;
    new (text?: string): SpeechSynthesisUtterance;
}

declare var SpeechSynthesisUtterance: SpeechSynthesisUtteranceStatic;

interface SpeechSynthesisEvent extends Event {
    utterance: SpeechSynthesisUtterance;
    charIndex: number;
    elapsedTime: number;
    name: string;
}

interface SpeechSynthesisErrorEvent extends SpeechSynthesisEvent {
    error: string;
}

interface SpeechSynthesisVoice {
    voiceURI: string;
    name: string;
    lang: string;
    localService: boolean;
    default: boolean;
}

/**
 * Internal class to provie an implementation of soudex
 */
class ArtyomInternals {

    /**
     * Soundex algorithm implementation
     * @param {string} s
     * @return {string}
     */
    static soundex(s: string) {
        let a = s.toLowerCase().split(''),
            f = a.shift(),
            r = '',
            codes = {
                a: '',
                e: '',
                i: '',
                o: '',
                u: '',
                b: 1,
                f: 1,
                p: 1,
                v: 1,
                c: 2,
                g: 2,
                j: 2,
                k: 2,
                q: 2,
                s: 2,
                x: 2,
                z: 2,
                d: 3,
                t: 3,
                l: 4,
                m: 5,
                n: 5,
                r: 6
            };

        r = f +
            a
            .map(function(v, i, a) {
                return codes[v];
            })
            .filter(function(v, i, a) {
                return ((i === 0) ? v !== codes[f] : v !== a[i - 1]);
            })
            .join('');

        return (r + '000').slice(0, 4).toUpperCase();
    }

}

/**
 * Helper methods for Artyom core implementation
 */
class ArtyomHelpers {

    /**
     * Determine if the current browser is Google Chrome (static method)
     * @return {boolean} 
     */
    static isChrome() {
        return navigator.userAgent.indexOf("Chrome") === -1;
    }

    /**
     * Determine if the current device is a mobile (static method)
     * @return {boolean}
     */
    static isMobileDevice() {
        return (navigator.userAgent.match(/Android/i) || 
                navigator.userAgent.match(/webOS/i) || 
                navigator.userAgent.match(/iPhone/i) || 
                navigator.userAgent.match(/iPad/i) || 
                navigator.userAgent.match(/iPod/i) || 
                navigator.userAgent.match(/BlackBerry/i) || 
                navigator.userAgent.match(/Windows Phone/i));
    }

    /**
     * Trigger an event
     * @param {string} name
     * @param {any} param
     * @return {event}
     */
    static artyomTriggerEvent(name: string, param?: any) {
        let event = new CustomEvent(name, {'detail': param});
        document.dispatchEvent(event);
        return event;
    };

}

interface ArtyomDevice {
    isChrome(): boolean; 
    isMobile(): boolean;
}

interface ArtyomBrowserVoiceObject {
    default: boolean;
    lang: string;
    localService: false;
    name: string;
    voiceURI: string;
}

interface ArtyomConfigProperties {
    lang?: string;
    recognizing?: boolean;
    continuous?: boolean;
    speed?: number;
    volume?: number;
    listen: boolean;
    mode?: string;
    debug: boolean;
    helpers?: {
        redirectRecognizedTextOutput: any;
        remoteProcessorHandler: any;
        lastSay: any;
    };
    executionKeyword?: string;
    obeyKeyword?: string;
    speaking?: boolean;
    obeying?: boolean;
    soundex?: boolean;
}

interface ArtyomCommand {
    indexes: string[];
    action: (i: number, wildcard?: string, full?: string) => void;
    description?: string;
    smart?: boolean;
}

interface ArtyomFlags {
    restartRecognition: boolean
}

interface ArtyomRecognizer {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    start(): void;
    stop(): void;
    onstart(): void;
    onresult(event: any): void;
    onerror(event: any): void;
    onend(): void;
}

const ArtyomGlobalEvents = {
    ERROR: "ERROR",
    SPEECH_SYNTHESIS_START: "SPEECH_SYNTHESIS_START",
    SPEECH_SYNTHESIS_END: "SPEECH_SYNTHESIS_END",
    TEXT_RECOGNIZED: "TEXT_RECOGNIZED",
    COMMAND_RECOGNITION_START : "COMMAND_RECOGNITION_START",
    COMMAND_RECOGNITION_END: "COMMAND_RECOGNITION_END",
    COMMAND_MATCHED: "COMMAND_MATCHED"
};

const ArtyomLanguages = {
    german: "Google Deutsch",
    spanish: "Google español",
    italian: "Google italiano",
    japanese: "Google 日本人",
    englishUSA: "Google US English",
    englishGB: "Google UK English Male",
    brasilian: "Google português do Brasil",
    russia: "Google русский",
    holand: "Google Nederlands",
    france: "Google français",
    polski: "Google polski",
    indonesia: "Google Bahasa Indonesia",
    mandarinChinese: "Google 普通话（中国大陆）",
    cantoneseChinese: "Google 粤語（香港）",
    native: "native"
}

export interface ArtyomJS {
    /**
     * Contains some basic information that artyom needs to know as the type of device and browser
     *
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/6/read-doc/artyom-device/artyom-js
     * @since 0.5.1
     * @type {Object}
     */
    device: ArtyomDevice;

    /**
     * 
     */
    artyomProperties: ArtyomConfigProperties;

    /**
     * 
     */
    artyomWSR: ArtyomRecognizer;

    /**
     * Artyom can return inmediately the voices available in your browser.
     *
     * @readonly
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/14/read-doc/artyom-getvoices/artyom-js
     * @returns {Array}
     */
    getVoices(): Array<SpeechSynthesisVoice>;

    /**
     * Returns an array with all the available commands for artyom.
     *
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/10/read-doc/artyom-getavailablecommands/artyom-js
     * @readonly
     * @returns {Array}
     */
    getAvailableCommands(): ArtyomCommand[];

    /**
     * Set up artyom for the application.
     *
     * This function will set the default language used by artyom
     * or notice the user if artyom is not supported in the actual
     * browser
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/15/read-doc/artyom-initialize/artyom-js
     * @param {Object} config
     * @returns {Boolean}
     */
    initialize(config: ArtyomConfigProperties): boolean;

    /**
     * Force artyom to stop listen even if is in continuos mode.
     *
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/9/read-doc/artyom-fatality/artyom-js
     * @returns {Boolean}
     */
    fatality(): boolean;

    /**
     * Add dinamically commands to artyom using
     * You can even add commands while artyom is active.
     *
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/4/read-doc/artyom-addcommands/artyom-js
     * @since 0.6
     * @param {Object | Array[Objects]} param
     * @returns {undefined}
     */
    addCommands(param: ArtyomCommand | ArtyomCommand[]): boolean;
    
    /**
     * Remove the commands of artyom with indexes that matches with the given text.
     *
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/19/read-doc/artyom-removecommands/artyom-js
     * @param {type} identifier
     * @returns {array}
     */
    removeCommands(identifier: string): Array<Number>;

    /**
     * Removes all the added commands of artyom.
     *
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/7/read-doc/artyom-emptycommands/artyom-js
     * @since 0.6
     * @returns {Array}
     */
    emptyCommands(): ArtyomCommand[];

    /**
     * Stops the actual and pendings messages that artyom have to say.
     *
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/23/read-doc/artyom-shutup/artyom-js
     * @returns {undefined}
     */
    shutUp(): void;

    /**
     * Returns an object with the actual properties of artyom.
     *
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/12/read-doc/artyom-getproperties/artyom-js
     * @returns {object}
     */
    getProperties(): ArtyomConfigProperties;

    /**
     * Create a listener when an artyom action is called.
     *
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/24/read-doc/artyom-when/artyom-js
     * @param {type} event
     * @param {type} action
     * @returns {undefined}
     */
    when(event: Event, action: any): any;

    /**
     * Returns the code language of artyom according to initialize function.
     * if initialize not used returns english GB.
     *
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/11/read-doc/artyom-getlanguage/artyom-js
     * @returns {String}
     */
    getLanguage(): string;

    /**
     * Talks a text according to the given parameters.
     *
     * @private
     * @param {String} text Text to be spoken
     * @param {Int} actualChunk Number of chunk of the
     * @param {Int} totalChunks
     * @returns {undefined}
     */
    artyomTalk(text: string, actualChunk: number, totalChunks: number, callbacks: any): any;

    /**
     * Splits a string into an array of strings with a limited size (chunk_length).
     *
     * @param {String} input text to split into chunks
     * @param {Integer} chunk_length limit of characters in every chunk
     */
    splitStringByChunks(input: string, chunkLength: number): string[];

    /**
     * Process the given text into chunks and execute the function artyomTalk
     *
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/20/read-doc/artyom-say/artyom-js
     * @param {String} message Text to be spoken
     * @param {Object} callbacks
     * @returns {undefined}
     */
    say(message: string, callbacks?: any): void;

    /**
     * Repeats the last sentence that artyom said.
     * Useful in noisy environments.
     *
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/25/read-doc/artyom-repeatlastsay/artyom-js
     * @param {Boolean} returnObject If set to true, an object with the text and the timestamp when was executed will be returned.
     * @returns {Object}
     */
    repeatLastSay(returnObject: any): void;

    /**
     * Verify if the browser supports speechSynthesis.
     *
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/40/read-doc/artyom-speechsupported/artyom-js
     * @returns {Boolean}
     */
    speechSupported(): boolean;

    /**
     * Verify if the browser supports webkitSpeechRecognition.
     *
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/39/read-doc/artyom-recognizingsupported/artyom-js
     * @returns {Boolean}
     */
    recognizingSupported(): boolean;

    /**
     * Simulate a voice command via JS
     *
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/22/read-doc/artyom-simulateinstruction/artyom-js
     * @param {type} sentence
     * @returns {undefined}
     */
    simulateInstruction(sentence: string): boolean;

    /**
     * Returns an object with data of the matched element
     *
     * @private
     * @param {string} comando
     * @returns {Boolean || Function}
     */
    artyomExecute(voice: string);

    /**
     * Displays a message in the console if the artyom propery DEBUG is set to true.
     *
     * @tutorial http://ourcodeworld.com/projects/projects-documentation/38/read-doc/artyom-debug/artyom-js
     * @param {type} e
     * @param {type} o
     * @returns {undefined}
     */
    debug(stringEvent: string, traceLevel: string): void;

    /**
     * Allows to retrieve the recognized spoken text of artyom
     * and do something with it everytime something is recognized
     *
     * @param {String} action
     * @returns {Boolean}
     */
    redirectRecognizedTextOutput(action: Function): boolean;

    /**
     * Says a random quote and returns it's object
     *
     * @param {type} data
     * @returns {object}
     */
    sayRandom(data);

    /**
     * Artyom provide an easy way to create a
     * dictation for your user.
     *
     * Just create an instance and start and stop when you want
     *
     * @returns Object | newDictation
     */
    newDictation(settings);

    /**
     * A voice prompt will be executed.
     *
     * @param {type} config
     * @returns {undefined}
     */
    newPrompt(config);

    /**
     * Artyom awaits for orders when this function
     * is executed.
     *
     * If artyom gets a first parameter the instance will be stopped.
     *
     * @private
     * @returns {undefined}
     */
    artyomHey();

    /**
     * This function will return the webkitSpeechRecognition object used by artyom
     * retrieve it only to debug on it or get some values, do not make changes directly
     *
     * @readonly
     * @since 0.9.2
     * @summary Retrieve the native webkitSpeechRecognition object
     * @returns {Object webkitSpeechRecognition}
     */
    getNativeApi();

    /**
     * This function returns a boolean according to the SpeechRecognition status
     * if artyom is listening, will return true.
     *
     * Note: This is not a feature of SpeechRecognition, therefore this value hangs on
     * the fiability of the onStart and onEnd events of the SpeechRecognition
     *
     * @since 0.9.3
     * @summary Returns true if SpeechRecognition is active
     * @returns {Boolean}
     */
    isRecognizing(): boolean;

    /**
     * This function returns a boolean according to the speechSynthesis status
     * if artyom is speaking, will return true.
     *
     * Note: This is not a feature of speechSynthesis, therefore this value hangs on
     * the fiability of the onStart and onEnd events of the speechSynthesis
     *
     * @since 0.9.3
     * @summary Returns true if speechSynthesis is active
     * @returns {Boolean}
     */
    isSpeaking(): boolean;

    /**
     * The SpeechSynthesisUtterance objects are stored in the artyomGarbageCollector variable
     * to prevent the wrong behaviour of artyom.say.
     * Use this method to clear all spoken SpeechSynthesisUtterance unused objects.
     *
     * @returns {Boolean}
     */
    clearGarbageCollection();

    /**
     * Returns the SpeechSynthesisUtterance garbageobjects.
     *
     * @returns {Array}
     */
    getGarbageCollection();

    /**
     * Pause the processing of commands. Artyom still listening in the background and it can be resumed after a couple of seconds.
     *
     * @returns {Boolean}
     */
    dontObey();

    /**
     * Allow artyom to obey commands again.
     *
     * @returns {Boolean}
     */
    obey();

    /**
     * A boolean to check if artyom is obeying commands or not.
     *
     * @returns {Boolean}
     */
    isObeying(): boolean;

    /**
     * Add commands like an artisan. If you use artyom for simple tasks
     * then probably you don't like to write a lot to achieve it.
     *
     * Use the artisan syntax to write less, but with the same accuracy.
     *
     * @disclaimer Not a promise-based implementation, just syntax.
     * @returns {Boolean}
     */
    on(indexes, smart): any;

    /**
     * Returns a string with the actual version of Artyom script.
     *
     * @summary Returns the actual version of artyom
     * @returns {String}
     */
    getVersion(): string;

    /**
     * Process the recognized text if artyom is active in remote mode.
     *
     * @returns {Boolean}
     */
    remoteProcessorService(action);

}

export class ArtyomJsImpl implements ArtyomJS {
    artyomCommands: ArtyomCommand[] = [];
    artyomGarbageCollector: SpeechSynthesisUtterance[] = [];
    artyomVoice: string;
    artyomProperties: ArtyomConfigProperties;
    artyomFlags: ArtyomFlags;
    artyomWSR: ArtyomRecognizer;

    constructor() {
        if (window.hasOwnProperty('webkitSpeechRecognition')) {
            const { webkitSpeechRecognition } : ArtyomWindow = <ArtyomWindow>window;
            this.artyomWSR = new webkitSpeechRecognition();
        }

        // Default values
        this.artyomProperties = {
            lang: 'en-GB',
            recognizing: false,
            continuous: false,
            speed: 1,
            volume: 1,
            listen: false,
            mode: 'normal',
            debug: false,
            helpers: {
                redirectRecognizedTextOutput: null,
                remoteProcessorHandler: null,
                lastSay: null
            },
            executionKeyword: null,
            obeyKeyword: null,
            speaking: false,
            obeying: true,
            soundex: false
        };

        // Recognition
        this.artyomFlags = {
            restartRecognition: false
        };

        // Default voice
        this.artyomVoice = 'Google UK English Male';
    }    

    device = {
        isChrome: () => { return ArtyomHelpers.isChrome(); },
        isMobile: () => { return !!ArtyomHelpers.isMobileDevice(); }
    };

    getVoices = (): Array<SpeechSynthesisVoice> => { 
        return (window['speechSynthesis']).getVoices(); 
    };

    getAvailableCommands = (): ArtyomCommand[] => {
        /*const commandsLength = this.artyomCommands.length;
        let availables = [];
        for (let i = 0; i < commandsLength; i++) {
            let command = this.artyomCommands[i];
            let aval = {};
            aval['indexes'] = command.indexes;

            if (command.smart) {
                aval['smart'] = true;
            }

            if (command.description) {
                aval['description'] = command.description;
            }

            availables.push(aval);
        }
        return availables;*/
        return this.artyomCommands;
    };

    initialize = (config: ArtyomConfigProperties): boolean => {
        if (typeof (config) !== "object") {
            console.error("You must give the configuration for start artyom properly.");
            return false;
        }

        if (config.hasOwnProperty("lang")) {
            switch (config.lang) {
                case 'de':
                case 'de-DE':
                    this.artyomVoice = ArtyomLanguages.german;
                    break;
                case 'en-GB':
                    this.artyomVoice = ArtyomLanguages.englishGB;
                    break;
                case "pt":
                case "pt-br":
                case "pt-PT":
                    this.artyomVoice = ArtyomLanguages.brasilian;
                    break;
                case "ru":
                case "ru-RU":
                    this.artyomVoice = ArtyomLanguages.russia;
                    break;
                case "nl":
                case "nl-NL":
                    this.artyomVoice = ArtyomLanguages.holand;
                    break;
                case 'es':
                case 'es-CO':
                case 'es-ES':
                    this.artyomVoice = ArtyomLanguages.spanish;
                    break;
                case "en":
                case 'en-US':
                    this.artyomVoice = ArtyomLanguages.englishUSA;
                    break;
                case 'fr':
                case 'fr-FR':
                    this.artyomVoice = ArtyomLanguages.france;
                    break;
                case 'it':
                case 'it-IT':
                    this.artyomVoice = ArtyomLanguages.italian;
                    break;
                case 'jp':
                case 'ja-JP':
                    this.artyomVoice = ArtyomLanguages.japanese;
                    break;
                case 'id':
                case 'id-ID':
                    this.artyomVoice = ArtyomLanguages.indonesia;
                    break;
                case 'pl':
                case 'pl-PL':
                    this.artyomVoice = ArtyomLanguages.polski;
                    break;
                case 'zh-CN':
                    this.artyomVoice = ArtyomLanguages.mandarinChinese;
                    break;
                case 'zh-HK':
                    this.artyomVoice = ArtyomLanguages.cantoneseChinese;
                    break;
                case 'native':
                    this.artyomVoice = ArtyomLanguages.native;
                    break;
                default:
                    console.warn("The given language for artyom is not supported yet. English has been set to default");
                    break;
            }
            this.artyomProperties.lang = config.lang;
        }

        if (config.hasOwnProperty("continuous")) {
            if (config.continuous) {
                this.artyomProperties.continuous = true;
                this.artyomFlags.restartRecognition = true;
            } else {
                this.artyomProperties.continuous = false;
                this.artyomFlags.restartRecognition = false;
            }
        }

        if (config.hasOwnProperty("speed")) {
            this.artyomProperties.speed = config.speed;
        }

        if (config.hasOwnProperty("soundex")) {
            this.artyomProperties.soundex = config.soundex;
        }

        if (config.hasOwnProperty("executionKeyword")) {
            this.artyomProperties.executionKeyword = config.executionKeyword;
        }

        if (config.hasOwnProperty("obeyKeyword")) {
            this.artyomProperties.obeyKeyword = config.obeyKeyword;
        }

        if (config.hasOwnProperty("volume")) {
            this.artyomProperties.volume = config.volume;
        }

        if(config.hasOwnProperty("listen")){
            this.artyomProperties.listen = config.listen;
        }

        if(config.hasOwnProperty("debug")){
            this.artyomProperties.debug = config.debug;
        }else{
            console.warn("The initialization doesn't provide how the debug mode should be handled. Is recommendable to set this value either to true or false.");
        }

        if (config.mode) {
            this.artyomProperties.mode = config.mode;
        }

        if (this.artyomProperties.listen === true) {
            this.artyomHey();
        }

        return true;
    };

    fatality = (): boolean => {
        try {
            // if config is continuous mode, deactivate anyway.
            this.artyomFlags.restartRecognition = false;
            this.artyomWSR.stop();
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    };

    addCommands = (param: ArtyomCommand | ArtyomCommand[]): boolean => {
        let _processObject = (obj: ArtyomCommand): void => {
            if(obj.hasOwnProperty("indexes")) {
                this.artyomCommands.push(obj);
            } else {
                console.error("The following command doesn't provide any index to execute :");
                console.dir(obj);
            }
        };

        if (param instanceof Array) {
            const paramLength = param.length;
            for (let i = 0; i < paramLength; i++) {
                _processObject(param[i]);
            }
        } else {
            _processObject(param);
        }

        return true;
    };

    removeCommands = (identifier: string): Array<Number> => {
        let toDelete = [];
        if (typeof (identifier) === "string") {
            const commandsLength = this.artyomCommands.length;
            for (let i = 0; i < commandsLength; i++) {
                let command = this.artyomCommands[i];
                if (command.indexes.indexOf(identifier)) {
                    toDelete.push(i);
                }
            }

            const toDeleteLength = toDelete.length;
            for (let o = 0; o < toDeleteLength; o++) {
                this.artyomCommands.splice(o, 1);
            }
        }

        return toDelete;
    }

    emptyCommands = (): ArtyomCommand[] => {
        return this.artyomCommands = [];
    };

    shutUp = () => {
        if ('speechSynthesis' in window) {
            do {
                (window['speechSynthesis']).cancel();
            } while ((window['speechSynthesis']).pending === true);
        }

        this.artyomProperties.speaking = false;
        this.clearGarbageCollection();
    };

    getProperties = (): ArtyomConfigProperties => {
        return this.artyomProperties;
    };

    when = (event, action) => {
        return document.addEventListener(event, (e) => {
            action(e.detail);
        }, false);
    };

    getLanguage = (): string => {
        switch (this.artyomVoice) {
            case 'Google UK English Male':
                return "en-GB";
            case 'Google español':
                return "es-CO";
            case 'Google Deutsch':
                return "de-DE";
            case 'Google français':
                return "fr-FR";
            case 'Google italiano':
                return "it-IT";
            case 'Google 日本人':
                return "ja-JP";
            case 'Google US English':
                return "en-US";
            case 'Google português do Brasil':
                return "pt-BR";
            case 'Google русский':
                return "ru-RU";
            case 'Google Nederlands':
                return "nl-NL";
            case 'Google polski':
                return "pl-PL";
            case 'Google Bahasa Indonesia':
                return "id-ID";
            case 'Google 普通话（中国大陆）':
                return "zh-CN";
            case 'Google 粤語（香港）':
                return "zh-HK";
            case 'native':
                return "native";
        }
    };

    artyomTalk = (text, actualChunk, totalChunks, callbacks) => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        msg.volume = this.artyomProperties.volume;
        msg.rate = this.artyomProperties.speed;

        // Select the voice according to the selected
        if (this.artyomVoice) {
            msg.voice = (window['speechSynthesis']).getVoices().filter((voice) => {
                return voice.name == this.artyomVoice;
            })[0];
        }

        // If is first text chunk (onStart)
        if (actualChunk == 1) {
            msg.addEventListener('start', () => {
                // Set artyom is talking
                this.artyomProperties.speaking = true;
                // Trigger the onSpeechSynthesisStart event
                this.debug("Event reached : " + ArtyomGlobalEvents.SPEECH_SYNTHESIS_START);
                // The original library dismiss the second parameter
                ArtyomHelpers.artyomTriggerEvent(ArtyomGlobalEvents.SPEECH_SYNTHESIS_START);
                // Trigger the onStart callback if exists
                if (callbacks) {
                    if (typeof(callbacks.onStart) == "function") {
                        callbacks.onStart.call(msg);
                    }
                }
            });
        }

        // If is final text chunk (onEnd)
        if ((actualChunk) >= totalChunks) {
            msg.addEventListener('end', () => {
                // Set artyom is talking
                this.artyomProperties.speaking = false;
                // Trigger the onSpeechSynthesisEnd event
                this.debug("Event reached : " + ArtyomGlobalEvents.SPEECH_SYNTHESIS_END);
                ArtyomHelpers.artyomTriggerEvent(ArtyomGlobalEvents.SPEECH_SYNTHESIS_END);
                // Trigger the onEnd callback if exists.
                if(callbacks){
                    if(typeof(callbacks.onEnd) == "function"){
                        callbacks.onEnd.call(msg);
                    }
                }
            });
        }

        // Notice how many chunks were processed for the given text.
        this.debug((actualChunk) + " text chunk processed succesfully out of " + totalChunks);

        // Important : Save the SpeechSynthesisUtterance object in memory, otherwise it will get lost
        // thanks to the Garbage collector of javascript
        this.artyomGarbageCollector.push(msg);
        (window['speechSynthesis']).speak(msg);
    };

    splitStringByChunks = (input, chunk_length): string[] => {
        let prev = 0;
        let output = [];
        input = input || "";
        chunk_length = chunk_length || 100;
        let curr = chunk_length;
        while (input[curr]) {
            if (input[curr++] == ' ') {
                output.push(input.substring(prev,curr));
                prev = curr;
                curr += chunk_length;
            }
        }
        output.push(input.substr(prev));
        return output;
    };

    say = (message: string, callbacks?): void => {
        let artyom_say_max_chunk_length = 115;
        if (this.speechSupported()) {
            if (typeof(message) === 'string') {
                if (message.length > 0) {
                    let definitive = [];

                    // If the providen text is long, proceed to split it
                    if(message.length > artyom_say_max_chunk_length) {
                        // Split the given text by pause reading characters [",",":",";","."] to provide a natural reading feeling.
                        let naturalReading = message.split(/,|:|\.|;/);

                        naturalReading.forEach((chunk, index) => {
                            // If the sentence is too long and could block the API, split it to prevent any errors.
                            if(chunk.length > artyom_say_max_chunk_length){
                                // Process the providen string into strings (withing an array) of maximum aprox. 115 characters to prevent any error with the API.
                                let temp_processed = this.splitStringByChunks(chunk, artyom_say_max_chunk_length);
                                // Add items of the processed sentence into the definitive chunk.
                                definitive.push.apply(definitive, temp_processed);
                            } else {
                                // Otherwise just add the sentence to being spoken.
                                definitive.push(chunk);
                            }
                        });
                    } else {
                        definitive.push(message);
                    }

                    // Clean any empty item in array
                    definitive = definitive.filter((e) => { return e; });

                    // Finally proceed to talk the chunks and assign the callbacks.
                    definitive.forEach((chunk, index) => {
                        let numberOfChunk = (index + 1);
                        if (chunk) {
                            this.artyomTalk(chunk, numberOfChunk, definitive.length, callbacks);
                        }
                    });

                    // Save the spoken text into the lastSay object of artyom
                    this.artyomProperties.helpers.lastSay = {
                        text: message,
                        date: new Date()
                    };
                } else {
                    console.warn("Artyom expects a string to say ... none given.");
                }
            } else {
                console.warn("Artyom expects a string to say ... " + typeof (message) + " given.");
            }
        }
    };

    repeatLastSay = (returnObject): void => {
        let last = this.artyomProperties.helpers.lastSay;
        if (returnObject) {
            return last;
        } else {
            if (last != null) {
                this.say(last.text);
            }
        }
    };

    speechSupported = (): boolean => {
        return 'speechSynthesis' in window;
    };

    recognizingSupported = (): boolean => {
        return 'webkitSpeechRecognition' in window;
    };

    simulateInstruction = (sentence: string): boolean => {
        if ((!sentence) || (typeof (sentence) !== "string")) {
            console.warn("Cannot execute a non string command");
            return false;
        }

        let foundCommand = this.artyomExecute(sentence);   // Command founded object
        if(foundCommand.result && foundCommand.objeto) {
        if (foundCommand.objeto.smart) {
            this.debug('Smart command matches with simulation, executing', "info");
            foundCommand.objeto.action(foundCommand.indice, foundCommand.wildcard.item, foundCommand.wildcard.full);
        } else {
            this.debug('Command matches with simulation, executing', "info");
            foundCommand.objeto.action(foundCommand.indice);  // Execute Normal command
        }
        return true;
        } else {
            console.warn("No command founded trying with " + sentence);
            return false;
        }
    };

    artyomExecute = (voice: string) => {
        if (!voice) {
            console.warn("Internal error: Execution of empty command");
            return {
                result: false,
                indice: null,
                    objeto: null,
                    wildcard: {
                        item: null,
                        full: voice
                    }
            };
        }

        let wildcard;
        this.debug(">> " + voice);

        // @3 Artyom needs time to think that
        let artyomCommandsLength = this.artyomCommands.length;
        for (let i = 0; i < artyomCommandsLength; i++) {
            let instruction = this.artyomCommands[i];
            let opciones = instruction.indexes;
            let encontrado = -1;
            const optionsLength = opciones.length; 
            for (let c = 0; c < optionsLength; c++) {
                let opcion = opciones[c];
                if (!instruction.smart) {
                    continue;  // Jump if is not smart command
                }

                if (opcion.indexOf("*") !== -1) {
                    // Logic here
                    let grupo = opcion.split("*");
                    if (grupo.length > 2) {
                        console.warn("Artyom found a smart command with " + (grupo.length - 1) + " wildcards. Artyom only support 1 wildcard for each command. Sorry");
                        continue;
                    }

                    // Start smart command 
                    let before = grupo[0];
                    let latter = grupo[1];

                    // Wildcard in the end
                    //if ((latter === "") || (latter === " ")) {
                    if(latter.trim() === "") {
                        if ((voice.indexOf(before) !== -1) || ((voice.toLowerCase()).indexOf(before.toLowerCase()) !== -1)) {
                            let wildy = voice.replace(before, '');
                            wildy = (wildy.toLowerCase()).replace(before.toLowerCase(), '');
                            wildcard = wildy;
                            encontrado = c;
                        }
                    } else {
                        if ((voice.indexOf(before) != -1) || ((voice.toLowerCase()).indexOf(before.toLowerCase()) != -1)) {
                            if ((voice.indexOf(latter) != -1) || ((voice.toLowerCase()).indexOf(latter.toLowerCase()) != -1)) {
                                let wildy = voice.replace(before, '').replace(latter, '');
                                wildy = (wildy.toLowerCase())
                                        .replace(before.toLowerCase(), '')
                                        .replace(latter.toLowerCase(), '');
                                wildy = (wildy.toLowerCase()).replace(latter.toLowerCase(), '');
                                wildcard = wildy;
                                encontrado = c;
                            }
                        }
                    }
                } else {
                    console.warn("Founded command marked as SMART but have no wildcard in the indexes, remove the SMART for prevent extensive memory consuming or add the wildcard *");
                }

                if ((encontrado >= 0)) {
                    encontrado = c;
                    break;
                }
            }

            if (encontrado >= 0) {
                ArtyomHelpers.artyomTriggerEvent(ArtyomGlobalEvents.COMMAND_MATCHED);
                return {
                    result: true,
                    indice: encontrado,
                    objeto: instruction,
                    wildcard: {
                        item: wildcard,
                        full: voice
                    }
                };
            }
        }  // End @3

        // @1 Search for IDENTICAL matches in the commands if nothing matches start with a index match in commands
        artyomCommandsLength = this.artyomCommands.length;
        for (let i = 0; i < artyomCommandsLength; i++) {
            let instruction = this.artyomCommands[i];
            let opciones = instruction.indexes;
            let encontrado = -1;

            // Execution of match with identical commands
            for (let c = 0; c < opciones.length; c++) {
                let opcion = opciones[c];
                if (instruction.smart) {
                    continue;  // Jump wildcard commands
                }

                if ((voice === opcion)) {
                    this.debug(">> MATCHED FULL EXACT OPTION " + opcion + " AGAINST " + voice + " WITH INDEX " + c + " IN COMMAND ", "info");
                    encontrado = c;
                    break;
                } else if ((voice.toLowerCase() === opcion.toLowerCase())) {
                    this.debug(">> MATCHED OPTION CHANGING ALL TO LOWERCASE " + opcion + " AGAINST " + voice + " WITH INDEX " + c + " IN COMMAND ", "info");
                    encontrado = c;
                    break;
                }
            }

            if (encontrado >= 0) {
                ArtyomHelpers.artyomTriggerEvent(ArtyomGlobalEvents.COMMAND_MATCHED);
                return {
                    result: true,
                    indice: encontrado,
                    objeto: instruction,
                    wildcard: null
                };
            }
        }  // End @1

        // Step 3 Commands recognition. If the command is not smart, and any of the commands match exactly then try to find a command in all the quote.
        artyomCommandsLength = this.artyomCommands.length;
        for (let i = 0; i < artyomCommandsLength; i++) {
            let instruction = this.artyomCommands[i];
            let opciones = instruction.indexes;
            let encontrado = -1;

            // Execution of match with index
            let optionsLength = opciones.length;
            for (let c = 0; c < optionsLength; c++) {
                if (instruction.smart) {
                    continue;  // Jump wildcard commands
                }

                let opcion = opciones[c];
                if ((voice.indexOf(opcion) >= 0)) {
                    this.debug(">> MATCHED INDEX EXACT OPTION " + opcion + " AGAINST " + voice + " WITH INDEX " + c + " IN COMMAND ", "info");
                    encontrado = c;
                    break;
                } else if (((voice.toLowerCase()).indexOf(opcion.toLowerCase()) >= 0)) {
                    this.debug(">> MATCHED INDEX OPTION CHANGING ALL TO LOWERCASE " + opcion + " AGAINST " + voice + " WITH INDEX " + c + " IN COMMAND ", "info");
                    encontrado = c;
                    break;
                }
            }

            if (encontrado >= 0) {
                ArtyomHelpers.artyomTriggerEvent(ArtyomGlobalEvents.COMMAND_MATCHED);
                return {
                    result: true,
                    indice: encontrado,
                    objeto: instruction,
                    wildcard: null
                };
            }
        }  // End Step 3

        /**
         * If the soundex options is enabled, proceed to process the commands in case that any of the previous
        * ways of processing (exact, lowercase and command in quote) didn't match anything.
        * Based on the soundex algorithm match a command if the spoken text is similar to any of the artyom commands.
        * Example:
        * If you have a command with "Open Wallmart" and "Open Willmar" is recognized, the open wallmart command will be triggered.
        * soundex("Open Wallmart") == soundex("Open Willmar") <= true
        *
        */
        if(this.artyomProperties.soundex){
            artyomCommandsLength = this.artyomCommands.length;
            for (let i = 0; i < artyomCommandsLength; i++) {
                let instruction = this.artyomCommands[i];
                let opciones = instruction.indexes;
                let encontrado = -1;
                let optionsLength = opciones.length;
                for (let c = 0; c < optionsLength; c++) {
                    let opcion = opciones[c];
                    if (instruction.smart) {
                        continue;  // Jump wildcard commands
                    }

                    if(ArtyomInternals.soundex(voice) == ArtyomInternals.soundex(opcion)){
                        this.debug(">> Matched Soundex command '"+opcion+"' AGAINST '"+voice+"' with index "+ c , "info");
                        encontrado = c;
                        ArtyomHelpers.artyomTriggerEvent(ArtyomGlobalEvents.COMMAND_MATCHED);
                        return {
                            result: true,
                            indice: encontrado,
                            objeto: instruction,
                            wildcard: null
                        };
                    }
                }
            }
        }

        return {
            result: false,
            indice: null,
            objeto: null,
            wildcard: null
        };
    };

    debug = (stringEvent: string, traceLevel?: string): void => {
        if (this.artyomProperties.debug === true) {
            switch (traceLevel) {
                case 'error':
                    console.log(' %cArtyom.js ' + " " + stringEvent, 'background: #C12127; color: #FFFFFF');
                    break;
                case 'warn':
                    console.warn(stringEvent);
                    break;
                case 'info':
                    console.log(' %cArtyom.js: ' + " " + stringEvent, 'background: #4285F4; color: #FFFFFF');
                    break;
                default:
                    console.log(' %cArtyom.js %c ' + " " + stringEvent, 'background: #005454; color: #BFF8F8', 'color:black;');
                    break;
            }
        }
    };

    redirectRecognizedTextOutput = (action: Function): boolean => {
        if (typeof (action) != "function") {
            console.warn("Expected function to handle the recognized text ...");
            return false;
        }

        this.artyomProperties.helpers.redirectRecognizedTextOutput = action;
        return true;
    };

    sayRandom = (data) => {
        if (data instanceof Array) {
            var index = Math.floor(Math.random() * data.length);
            this.say(data[index]);
            return {
                text: data[index],
                index: index
            };
        } else {
            console.error("Random quotes must be in an array !");
            return null;
        }
    };

    newDictation = (settings) => {
        if (!this.recognizingSupported()) {
            console.error("SpeechRecognition is not supported in this browser");
            return false;
        }

        let dictado = new webkitSpeechRecognition();
        dictado.continuous = true;
        dictado.interimResults = true;
        dictado.lang = this.artyomProperties.lang;
        dictado.onresult = (event) => {
            let temporal = "";
            let interim = "";
            let resultsLength = event.results.length;
            for (let i = 0; i < resultsLength; ++i) {
                if (event.results[i].isFinal) {
                    temporal += event.results[i][0].transcript;
                } else {
                    interim += event.results[i][0].transcript;
                }
            }

            if (settings.onResult) {
                settings.onResult(interim, temporal);
            }
        };

        return new function () {
            let dictation = dictado;
            let flagStartCallback = true;
            let flagRestart = false;
            this.onError = null;

            this.start = () => {
                if (settings.continuous === true) {
                    flagRestart = true;
                }

                dictation.onstart = () => {
                    if (typeof (settings.onStart) === "function") {
                        if (flagStartCallback === true) {
                            settings.onStart();
                        }
                    }
                };

                dictation.onend = () => {
                    if (flagRestart === true) {
                        flagStartCallback = false;
                        dictation.start();
                    } else {
                        flagStartCallback = true;
                        if (typeof (settings.onEnd) === "function") {
                            settings.onEnd();
                        }
                    }
                };

                dictation.start();
            };

            this.stop = () => {
                flagRestart = false;
                dictation.stop();
            };

            if (typeof (settings.onError) === "function") {
                dictation.onerror = settings.onError;
            }
        };
    };

    newPrompt = (config) => {
        if (typeof (config) !== "object") {
            console.error("Expected the prompt configuration.");
        }

        let copyActualCommands = (<any>Object).assign([], this.artyomCommands);
        this.emptyCommands();
        let promptCommand: ArtyomCommand = {
            description: 'Setting the artyom commands only for the prompt. The commands will be restored after the prompt finishes',
            indexes: config.options,
            smart: (config.smart) ? true : false,
            action: (i, wildcard) => {
                this.artyomCommands = copyActualCommands;
                let toExe = config.onMatch(i, wildcard);
                if (typeof (toExe) !== "function") {
                    console.error("onMatch function expects a returning function to be executed");
                    return;
                }
                toExe();
            }
        };
        this.addCommands(promptCommand);

        if (typeof (config.beforePrompt) !== "undefined") {
            config.beforePrompt();
        }

        this.say(config.question, {
            onStart: () => {
                if (typeof (config.onStartPrompt) !== "undefined") {
                    config.onStartPrompt();
                }
            },
            onEnd: () => {
                if (typeof (config.onEndPrompt) !== "undefined") {
                    config.onEndPrompt();
                }
            }
        });
    };

    artyomHey = (): void => {
        let start_timestamp;
        let artyom_is_allowed;

        this.artyomWSR.continuous = true;
        this.artyomWSR.interimResults = true;
        this.artyomWSR.lang = this.artyomProperties.lang;
        this.artyomWSR.onstart = () => {
            this.debug("Event reached : " + ArtyomGlobalEvents.COMMAND_RECOGNITION_START);
            ArtyomHelpers.artyomTriggerEvent(ArtyomGlobalEvents.COMMAND_RECOGNITION_START);
            this.artyomProperties.recognizing = true;
            artyom_is_allowed = true;
        };

        /**
         * Handle all artyom posible exceptions
        * @param {type} event
        * @returns {undefined}
        */
        this.artyomWSR.onerror = (event) => {
            // Dispath error globally (artyom.when)
            ArtyomHelpers.artyomTriggerEvent(ArtyomGlobalEvents.ERROR, {
                code: event.error
            });

            if (event.error === 'audio-capture') {
                artyom_is_allowed = false;
            }

            if (event.error === 'not-allowed') {
                artyom_is_allowed = false;
                if (event.timeStamp - start_timestamp < 100) {
                    ArtyomHelpers.artyomTriggerEvent(ArtyomGlobalEvents.ERROR, {
                        code: "info-blocked",
                        message: "Artyom needs the permision of the microphone, is blocked."
                    });
                } else {
                    ArtyomHelpers.artyomTriggerEvent(ArtyomGlobalEvents.ERROR, {
                        code: "info-denied",
                        message: "Artyom needs the permision of the microphone, is denied"
                    });
                }
            }
        };

        /**
         * Check if continuous mode is active and restart the recognition. Throw events too.
        */
        this.artyomWSR.onend = () => {
            if (this.artyomFlags.restartRecognition === true) {
                if (artyom_is_allowed === true) {
                    this.artyomWSR.start();
                    this.debug("Continuous mode enabled, restarting", "info");
                } else {
                    console.error("Verify the microphone and check for the table of errors in sdkcarlos.github.io/sites/artyom.html to solve your problem. If you want to give your user a message when an error appears add an artyom listener");
                }

                ArtyomHelpers.artyomTriggerEvent(ArtyomGlobalEvents.COMMAND_RECOGNITION_END,{
                    code: "continuous_mode_enabled",
                    message: "OnEnd event reached with continuous mode"
                });
            } else {
                ArtyomHelpers.artyomTriggerEvent(ArtyomGlobalEvents.COMMAND_RECOGNITION_END,{
                    code: "continuous_mode_disabled",
                    message: "OnEnd event reached without continuous mode"
                });
            }

            this.artyomProperties.recognizing = false;
        };

        /**
         * Declare the processor dinamycally according to the mode of artyom to increase the performance.
        */
        let onResultProcessor: Function;

        // Process the recognition in normal mode
        if(this.artyomProperties.mode === "normal"){
            onResultProcessor = (event) => {
                if (!this.artyomCommands.length) {
                    this.debug("No commands to process in normal mode.");
                    return;
                }

                ArtyomHelpers.artyomTriggerEvent(ArtyomGlobalEvents.TEXT_RECOGNIZED);

                let cantidadResultados = event.results.length;
                for (let i = event.resultIndex; i < cantidadResultados; ++i) {
                    let identificated = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        let comando = this.artyomExecute(identificated.trim());

                        // Redirect the output of the text if necessary
                        if (typeof (this.artyomProperties.helpers.redirectRecognizedTextOutput) === "function") {
                            this.artyomProperties.helpers.redirectRecognizedTextOutput(identificated, true);
                        }

                        if ((comando.result !== false) && (this.artyomProperties.recognizing === true)) {
                            this.debug("<< Executing Matching Recognition in normal mode >>", "info");
                            this.artyomWSR.stop();
                            this.artyomProperties.recognizing = false;
                            // Execute the command if smart
                            if (comando.wildcard) {
                                comando.objeto.action(comando.indice, comando.wildcard.item, comando.wildcard.full);
                            // Execute a normal command
                            } else {
                                comando.objeto.action(comando.indice);
                            }

                            break;
                        }
                    } else {
                        // Redirect output when necesary
                        if (typeof (this.artyomProperties.helpers.redirectRecognizedTextOutput) === "function") {
                            this.artyomProperties.helpers.redirectRecognizedTextOutput(identificated, false);
                        }

                        if (typeof (this.artyomProperties.executionKeyword) === "string") {
                            if (identificated.indexOf(this.artyomProperties.executionKeyword) !== -1) {
                                let comando = this.artyomExecute(identificated.replace(this.artyomProperties.executionKeyword, '').trim());
                                if ((comando.result !== false) && (this.artyomProperties.recognizing === true)) {
                                    this.debug("<< Executing command ordered by ExecutionKeyword >>", 'info');
                                    this.artyomWSR.stop();
                                    this.artyomProperties.recognizing = false;
                                    // Executing Command Action
                                    if (comando.wildcard) {
                                        comando.objeto.action(comando.indice, comando.wildcard.item, comando.wildcard.full);
                                    } else {
                                        comando.objeto.action(comando.indice);
                                    }

                                    break;
                                }
                            }
                        }

                        this.debug("Normal mode : " + identificated);
                    }
                }
            }
        }

        // Process the recognition in quick mode
        if(this.artyomProperties.mode === "quick"){
            onResultProcessor = (event) => {
                if (!this.artyomCommands.length) {
                    this.debug("No commands to process.");
                    return;
                }

                ArtyomHelpers.artyomTriggerEvent(ArtyomGlobalEvents.TEXT_RECOGNIZED);
                let cantidadResultados = event.results.length;
                for (let i = event.resultIndex; i < cantidadResultados; ++i) {
                    let identificated = event.results[i][0].transcript;
                    if (!event.results[i].isFinal) {
                        let comando = this.artyomExecute(identificated.trim());
                        // Redirect output when necesary
                        if (typeof (this.artyomProperties.helpers.redirectRecognizedTextOutput) === "function") {
                            this.artyomProperties.helpers.redirectRecognizedTextOutput(identificated, true);
                        }

                        if ((comando.result !== false) && (this.artyomProperties.recognizing == true)) {
                            this.debug("<< Executing Matching Recognition in quick mode >>", "info");
                            this.artyomWSR.stop();
                            this.artyomProperties.recognizing = false;

                            // Executing Command Action
                            if (comando.wildcard) {
                                comando.objeto.action(comando.indice, comando.wildcard.item);
                            } else {
                                comando.objeto.action(comando.indice);
                            }

                            break;
                        }
                    } else {
                        let comando = this.artyomExecute(identificated.trim());
                        // Redirect output when necesary
                        if (this.artyomProperties.helpers && typeof (this.artyomProperties.helpers.redirectRecognizedTextOutput) === "function") {
                            this.artyomProperties.helpers.redirectRecognizedTextOutput(identificated, false);
                        }

                        if ((comando.result !== false) && (this.artyomProperties.recognizing == true)) {
                            this.debug("<< Executing Matching Recognition in quick mode >>", "info");
                            this.artyomWSR.stop();
                            this.artyomProperties.recognizing = false;

                            // Executing Command Action
                            if (comando.wildcard) {
                                if(comando.objeto && typeof(comando.indice) === 'number') {
                                    comando.objeto.action(comando.indice, comando.wildcard.item);
                                }
                            } else {
                                if(comando.objeto && typeof(comando.indice) === 'number') {
                                    comando.objeto.action(comando.indice);
                                }
                            }

                            break;
                        }
                    }

                    this.debug("Quick mode : " + identificated);
                }
            }
        }

        // Process the recognition in remote mode
        if(this.artyomProperties.mode == "remote"){
            onResultProcessor = (event: any) => {
                ArtyomHelpers.artyomTriggerEvent(ArtyomGlobalEvents.TEXT_RECOGNIZED);
                let cantidadResultados = event.results.length;
                if (this.artyomProperties.helpers && typeof (this.artyomProperties.helpers.remoteProcessorHandler) !== "function") {
                    return this.debug("The remoteProcessorService is undefined.", "warn");
                }

                for (let i = event.resultIndex; i < cantidadResultados; ++i) {
                    let identificated = event.results[i][0].transcript;
                    if(this.artyomProperties.helpers) {
                        this.artyomProperties.helpers.remoteProcessorHandler({
                            text: identificated,
                            isFinal: event.results[i].isFinal
                        });
                    }
                }
            }
        }

        /**
         * Process the recognition event with the previously declared processor function.
        */
        this.artyomWSR.onresult = (event) => {
            if(this.artyomProperties.obeying) {
                onResultProcessor(event);
            } else {
                // Handle obeyKeyword if exists and artyom is not obeying
                if(!this.artyomProperties.obeyKeyword) {
                    return;
                }

                let temporal = "";
                let interim = "";
                let resultsLength = event.results.length;
                for (let i = 0; i < resultsLength; ++i) {
                    if (event.results[i].final) {
                        temporal += event.results[i][0].transcript;
                    } else {
                        interim += event.results[i][0].transcript;
                    }
                }

                this.debug("Artyom is not obeying","warn");

                // If the obeyKeyword is found in the recognized text enable command recognition again
                if(((interim).indexOf(this.artyomProperties.obeyKeyword) > -1) || (temporal).indexOf(this.artyomProperties.obeyKeyword) > -1){
                    this.artyomProperties.obeying = true;
                }
            }
        };

        if (this.artyomProperties.recognizing) {
            this.artyomWSR.stop();
            this.debug("Event reached : " + ArtyomGlobalEvents.COMMAND_RECOGNITION_END);
            ArtyomHelpers.artyomTriggerEvent(ArtyomGlobalEvents.COMMAND_RECOGNITION_END);
        } else {
            try {
                this.artyomWSR.start();
            } catch (e) {
                ArtyomHelpers.artyomTriggerEvent(ArtyomGlobalEvents.ERROR,{
                    code: "recognition_overlap",
                    message: "A webkitSpeechRecognition instance has been started while there's already running. Is recommendable to restart the Browser"
                });
            }
        }
    }; 

    getNativeApi = () => {
        return this.artyomWSR;
    };

    isRecognizing = (): boolean => {
        return !!this.artyomProperties.recognizing;
    };

    isSpeaking = (): boolean => {
        return !!this.artyomProperties.speaking;
    };

    clearGarbageCollection = () => {
        // Review this return, because it will always return true
        return this.artyomGarbageCollector = [];
    };

    getGarbageCollection = () => {
        return this.artyomGarbageCollector;
    };

    dontObey = () => {
        // Comprobar tipo devuelto -> siempre false?
        return this.artyomProperties.obeying = false;
    };

    obey = () => {
        // Comprobar tipo devuelto -> siempre true?
        return this.artyomProperties.obeying = true;
    };

    isObeying = (): boolean => {
        return !!this.artyomProperties.obeying;
    };

    getVersion = () => {
        return "1.0.2";
    };

    on = (indexes: any, smart: boolean): any => {
        return {
            then: (action: any) => {
                var command = {
                    indexes: indexes,
                    action: action,
                    smart: false
                };

                if (smart) {
                    command.smart = true;
                }

                this.addCommands(command);
            }
        };
    };

    remoteProcessorService = (action: any): boolean => {
        if(this.artyomProperties.helpers) {
            this.artyomProperties.helpers.remoteProcessorHandler = action;
        }
        return true;
    };

}

/**
 * Artyom.js - A voice control / voice commands / speech recognition and speech synthesis javascript library. 
 * Create your own siri,google now or cortana with Google Chrome within your website.
 * That class requires webkitSpeechRecognition and speechSynthesis APIs.
 */
export class ArtyomBuilder {

    private static instance: ArtyomJS;

    private constructor() {
        let artyom: ArtyomJS;
        let artyomVoice = 'Google UK English Male';
        let artyom_garbage_collector = [];
        let artyomCommands = [];
    }

    static getInstance(): ArtyomJS {
        if (!ArtyomBuilder.instance) {
            // Protect the instance to be inherited
            ArtyomBuilder.instance = Object.preventExtensions(new ArtyomJsImpl());
        }
        // Return the instance
        return ArtyomBuilder.instance;
    }

}
