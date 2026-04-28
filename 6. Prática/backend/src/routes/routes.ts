import { Express } from 'express';
import express from 'express';

export default function (app: Express) {
    app
        .use(express.json())
        .use('/api', )
}