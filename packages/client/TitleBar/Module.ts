interface Module {
    displayName: string;
    name: string;
    selected: boolean;
    url: string;
}

interface Modules {
    modules: Module[];
    title: string;
}

interface VersionInfo {
    year: string;
    month: string;
    day: string;
    title: string;
    author: string;
    location: string;
    major: number;
    minor: number;
}

export { Module };
export { VersionInfo };

export default Modules;