import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PollModule = buildModule("PollModule", (m) => {
    const poll = m.contract("Poll");

    return { poll };
});

export default PollModule;
