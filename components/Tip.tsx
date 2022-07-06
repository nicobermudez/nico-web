import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import web3 from "web3";

const Wrapper = styled.div(
    {
        boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
        borderRadius: 8,
        position: "fixed",
        bottom: 32,
        right: 32,
        width: 200,
        padding: "16px 32px 32px 32px",
        display: "flex",
        flexDirection: "column",
        animation: "fadein 0.4s 0.8s ease-in-out both",
        "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
        },
        "input[type=number]": {
            MozAppearance: "textfield",
        },
        zIndex: 2,
    },
    ({ theme }) => ({
        backgroundColor: theme.palette.surfaces.secondary,
    }),
);

const Input = styled.input({
    gridArea: "input",
    border: `1px solid #d0d0d0`,
    borderRadius: 4,
    padding: 8,
    textAlign: "right",
    ":focus": {
        outline: "none",
    },
    maxWidth: "50%",
});

export const Tip: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState("0.01");
    const [hasWallet, setHasWallet] = useState(false);
    useEffect(() => {
        if ((window as any).ethereum) {
            setHasWallet(true);
        }
    }, []);

    if (!visible) {
        return (
            <Wrapper
                style={{
                    borderRadius: 100,
                    height: 32,
                    width: 32,
                    padding: 32,
                    justifyContent: "center",
                    alignContent: "center",
                    cursor: "pointer",
                }}
                onClick={() => setVisible(true)}
            >
                <span
                    style={{
                        fontSize: 14,
                        textAlign: "center",
                        fontWeight: 600,
                    }}
                >
                    Tips
                </span>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div
                onClick={() => setVisible(false)}
                style={{
                    textDecoration: "underline",
                    fontSize: 12,
                    textAlign: "right",
                    marginBottom: 16,
                    cursor: "pointer",
                }}
            >
                Hide
            </div>
            <label
                style={{
                    gridArea: "label",
                    marginBottom: 16,
                    textAlign: "left",
                }}
            >
                If you like my page, please consider sending me a tip!
            </label>
            <div
                style={{
                    marginBottom: 16,
                    textAlign: "center",
                }}
            >
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="number"
                />
                <span style={{ gridArea: "eth", marginLeft: 8 }}>ETH</span>
            </div>
            <Button
                onClick={async () => {
                    if (!hasWallet) {
                        alert("Please install a wallet");
                        return;
                    }

                    const accounts = await (window as any).ethereum.request({
                        method: "eth_requestAccounts",
                    });

                    const wei = web3.utils.toWei(value, "ether");
                    if (accounts?.[0]) {
                        try {
                            await (window as any).ethereum.request({
                                method: "eth_sendTransaction",
                                params: [
                                    {
                                        from: accounts[0],
                                        to: "0xAca0842546A19E0F64738b8CF9E8c570D831457E",
                                        value: web3.utils.toHex(wei),
                                    },
                                ],
                            });
                            alert("Woo! Thank you!!");
                        } catch (e) {
                            return;
                        }
                    }
                }}
                disabled={!value}
                style={{ marginTop: 16, textAlign: "center" }}
            >
                Tip
            </Button>
        </Wrapper>
    );
};
