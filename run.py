import uvicorn


def main():
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, http="httptools")


if __name__ == "__main__":
    main()
