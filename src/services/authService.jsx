
export const login = async (username, password) => {
    // Mock API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === "user" && password === "pass") {
                resolve({ token: "mock-token" });
            } else {
                reject(new Error("Invalid credentials"));
            }
        }, 1000);
    });
};
