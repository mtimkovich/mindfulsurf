function wait(ms) {
    const start = performance.now();
    while (performance.now() - start < ms);
}

wait(3000);
